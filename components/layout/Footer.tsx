import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 py-12 md:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <Link href="/" className="font-black text-xl tracking-tighter">F\F</Link>
                        <p className="mt-3 text-sm text-muted-foreground">Wear the future.</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-3">Shop</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
                            <li><Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link></li>
                            <li><Link href="/fit-finder" className="hover:text-foreground transition-colors">AI Fit Finder</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-3">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/studio" className="hover:text-foreground transition-colors">Studio</Link></li>
                            <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-3">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund &amp; Cancellation</Link></li>
                            <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms &amp; Conditions</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Future Fit. All rights reserved.</p>
                    <p>Founded by Pradeep C Hosamani</p>
                </div>
            </div>
        </footer>
    );
}
