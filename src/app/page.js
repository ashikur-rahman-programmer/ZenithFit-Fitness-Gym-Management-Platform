import Banner from "@/components/homepage/Banner";
import FeaturedClasses from "@/components/homepage/FeaturedClasses";
import LatestForumPage from "@/components/homepage/LatestForumPage";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedClasses />
      <LatestForumPage />
      <WhyChooseUs />
    </main>
  );
}
