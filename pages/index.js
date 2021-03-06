import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import HomePage from "../components/HomePage";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Books Rental</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <NavigationBar />
      <HomePage />
      <Footer />
    </>
  );
}
