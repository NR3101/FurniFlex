const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          We love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              FurniFlex
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 leading-8 text-lg max-w-2xl mx-auto">
        Welcome to 🏡FurniFlex, where comfort meets style! Dive into a world of
        furniture magic, from plush sofas that hug you tight 😍 to elegant
        tables that elevate every meal 🍽️ and cozy beds that beckon sweet dreams
        🌙. Our curated collection is your passport to interior design
        excellence! Create your dream home with us today and make every corner a
        masterpiece 🎨. Let's transform your living spaces into havens of beauty
        and serenity!✨
      </p>
    </>
  );
};

export default About;
