import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us — Customer Support & Partnerships",
    description:
        "Get in touch with Future Fit. Customer support, press inquiries, and partnership opportunities. Visit our HQ in San Francisco.",
    openGraph: {
        title: "Contact Us — Future Fit",
        description: "Get in touch with Future Fit for support or partnerships.",
    },
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <h1 className="text-4xl font-black mb-8 tracking-tighter text-center">CONTACT US</h1>
            <div className="space-y-8 text-center">
                <p className="text-xl text-muted-foreground">
                    We are here to help you fit the future.
                </p>

                <div className="grid gap-6 md:grid-cols-2 text-left bg-secondary p-8 rounded-lg">
                    <div>
                        <h3 className="font-bold mb-2">Business Name</h3>
                        <p className="text-muted-foreground">Future Fit</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Founder</h3>
                        <p className="text-muted-foreground">Pradeep C Hosamani</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Email</h3>
                        <a href="mailto:wearfuturefit@gmail.com" className="text-foreground hover:underline">wearfuturefit@gmail.com</a>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Location</h3>
                        <p className="text-muted-foreground">India</p>
                    </div>
                </div>

                <div className="pt-8 border-t border-border text-sm text-muted-foreground">
                    <p>We typically respond within 24 hours.</p>
                </div>
            </div>
        </div>
    );
}
