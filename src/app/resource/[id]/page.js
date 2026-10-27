"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/components/Icons";

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default function ResourceDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();

    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processingPayment, setProcessingPayment] = useState(false);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await fetch(`/api/resources/${id}`);
                const data = await response.json();

                if (data.success) {
                    setResource(data.resource);
                } else {
                    toast.error(data.error || "Failed to load resource");
                }
            } catch (error) {
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchResource();
        }
    }, [id]);

    const handlePayment = async () => {
        if (!session) {
            toast.info("Please log in to purchase this resource.");
            router.push("/api/auth/signin");
            return;
        }

        setProcessingPayment(true);
        const res = await loadRazorpayScript();

        if (!res) {
            toast.error("Razorpay SDK failed to load. Please check your connection.");
            setProcessingPayment(false);
            return;
        }

        try {
            const orderResponse = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resourceId: id }),
            });
            const orderData = await orderResponse.json();

            if (!orderData.success) {
                toast.error(orderData.error || "Failed to initiate payment");
                setProcessingPayment(false);
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: "GyaanBank",
                description: `Purchase: ${resource.title}`,
                order_id: orderData.order.id,
                handler: async function (response) {
                    try {
                        const verifyResponse = await fetch("/api/payment/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.success) {
                            toast.success("Payment successful! Access granted.");
                            window.location.reload();
                        } else {
                            toast.error(verifyData.error || "Payment verification failed");
                        }
                    } catch (err) {
                        toast.error("Error verifying payment");
                    }
                },
                prefill: {
                    name: session.user?.name || "",
                    email: session.user?.email || "",
                },
                theme: {
                    color: "#1d4ed8",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on("payment.failed", function (response) {
                toast.error(response.error.description || "Payment failed");
            });
            paymentObject.open();

        } catch (error) {
            toast.error("Something went wrong with the payment process");
        } finally {
            setProcessingPayment(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <span className="text-slate-500 font-medium">Loading details...</span>
            </div>
        );
    }

    if (!resource) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Resource not found</h2>
                    <Link href="/explore" className="mt-4 inline-block text-blue-700 font-medium hover:underline">
                        Back to Explore
                    </Link>
                </div>
            </div>
        );
    }

    const hasAccess = !!resource.externalLink;
    const isCreator = session?.user?.id === resource.creator?._id;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                <div className="mb-6">
                    <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Explore
                    </Link>
                </div>

                <div className="bg-white border border-slate-200 rounded-md shadow-sm mb-8 overflow-hidden">

                    <div className="p-6 sm:p-8 border-b border-slate-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2.5 py-1 font-semibold uppercase tracking-wider rounded">
                                        {resource.category}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                                        {resource.subject}
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                    {resource.title}
                                </h1>
                            </div>
                            <div className="text-left sm:text-right shrink-0">
                                <p className="text-2xl font-bold text-slate-900">
                                    {resource.price === 0 ? "Free" : `₹${resource.price}`}
                                </p>
                                <p className="text-sm text-slate-500 mt-1">One-time payment</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 text-sm text-slate-600">
                            <span className="font-medium">Uploaded by:</span>
                            <span>{resource.creator?.name || "Anonymous User"}</span>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50/50">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                            About this material
                        </h3>
                        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                            {resource.desc}
                        </p>
                    </div>

                    {!hasAccess ? (
                        <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center bg-white">
                            <div className="w-full max-w-md">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Get Lifetime Access</h3>
                                <p className="text-sm text-slate-500 mb-6">
                                    Purchase once and access it forever from your personal library. The creator gets paid directly.
                                </p>

                                {status === "loading" ? (
                                    <button disabled className="w-full bg-slate-200 text-slate-500 font-medium py-3 px-6 rounded-md">
                                        Loading...
                                    </button>
                                ) : !session ? (
                                    <button
                                        onClick={() => router.push("/api/auth/signin")}
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-md transition-colors"
                                    >
                                        Log in to Purchase
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePayment}
                                        disabled={processingPayment}
                                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {processingPayment ? "Processing..." : `Pay ₹${resource.price} securely`}
                                    </button>
                                )}

                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Secured by Razorpay</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 sm:p-12 bg-white flex justify-center">
                            <div className="w-full max-w-3xl border border-slate-200 bg-slate-50 rounded-md flex flex-col items-center justify-center aspect-4/3 md:aspect-video text-center p-6">

                                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {isCreator ? "Creator Access Verified" : "Access Granted"}
                                </h3>

                                <p className="text-sm text-slate-500 mb-8 max-w-md">
                                    Your access to this resource is ready. Click the button below to open the material securely in a new tab.
                                </p>

                                <a
                                    href={resource.externalLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-md transition-colors inline-flex items-center gap-2"
                                >
                                    Open Resource <ExternalLinkIcon />
                                </a>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}