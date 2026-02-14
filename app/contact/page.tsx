export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <h1 className="text-4xl font-black mb-8 tracking-tighter text-center">CONTACT US</h1>
            <div className="space-y-8 text-center">
                <p className="text-xl text-muted-foreground">
                    Have questions about your order or our AI tools? We're here to help.
                </p>

                <div className="grid gap-4 md:grid-cols-2 text-left bg-secondary p-8 rounded-lg">
                    <div>
                        <h3 className="font-bold mb-2">Customer Support</h3>
                        <p className="text-muted-foreground">support@futurefit.ai</p>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Press & Partnerships</h3>
                        <p className="text-muted-foreground">press@futurefit.ai</p>
                    </div>
                </div>

                <div className="pt-8 border-t border-border">
                    <h2 className="text-2xl font-bold mb-4">Visit HQ</h2>
                    <p className="text-muted-foreground">
                        123 Future Boulevard<br />
                        San Francisco, CA 94107
                    </p>
                </div>
            </div>
        </div>
    );
}
