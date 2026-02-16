// This is a minimal data access layer for the MVP
// It fetches the exported data.json from the public folder

export interface Product {
    slug: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    msrp: number;
    lifecycle_start_week: number;
    usage_duration_weeks: number;
    image_url: string;
    prices?: any[];
    attributes?: any[];
}

export class GearAPI {
    private data: any = null;

    async fetchData() {
        if (this.data) return this.data;
        try {
            const response = await fetch('/data.json');
            this.data = await response.json();
            return this.data;
        } catch (error) {
            console.error('Failed to fetch data:', error);
            return { products: [], retailerPrices: [], productAttributes: [], lifecycleStages: [], recommendations: [] };
        }
    }

    async getProductsByCategory(category: string) {
        const { products } = await this.fetchData();
        return products.filter((p: Product) => p.category === category);
    }

    async getProductBySlug(slug: string) {
        const { products, retailerPrices, productAttributes } = await this.fetchData();
        const product = products.find((p: Product) => p.slug === slug);
        if (product) {
            product.prices = retailerPrices.filter((p: any) => p.product_slug === slug);
            product.attributes = productAttributes.filter((p: any) => p.product_slug === slug);
        }
        return product;
    }

    async getLifecycleProducts(week: number) {
        const { products, recommendations } = await this.fetchData();
        // Logic: products recommended for this week or essential items needed by this week
        // We can also look at recommendations table for specific context_slug like 'pregnancy-week-20'
        const recsForWeek = recommendations.filter((r: any) => r.context_slug === `pregnancy-week-${week}`);

        if (recsForWeek.length > 0) {
            const recSlugs = recsForWeek.map((r: any) => r.product_slug);
            return products.filter((p: any) => recSlugs.includes(p.slug)).map((p: any) => {
                const rec = recsForWeek.find((r: any) => r.product_slug === p.slug);
                return { ...p, reason: rec.recommendation_reason, essential: rec.is_essential };
            });
        }

        // Fallback to simple week logic if no specific recommendations
        return products.filter((p: Product) => p.lifecycle_start_week <= week && p.lifecycle_start_week > week - 4);
    }
}

