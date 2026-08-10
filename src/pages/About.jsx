import React, { useEffect } from 'react';
import { ShoppingBag, Heart, Smile, MapPin, Truck, MessageCircle } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <ShoppingBag className="w-6 h-6 text-primary" />,
      title: "Wide Product Range",
      description: "From daily groceries to specialty items, we stock everything you need under one roof."
    },
    {
      icon: <Smile className="w-6 h-6 text-primary" />,
      title: "Friendly Service",
      description: "Our dedicated staff is always ready to help you find exactly what you're looking for with a smile."
    },
    {
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: "Convenient Ordering",
      description: "Order via WhatsApp or visit our store. We make shopping flexible and hassle-free."
    },
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Quality First",
      description: "We carefully select our suppliers to ensure you always get the freshest and best quality products."
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Local Store",
      description: "Deeply rooted in Sakoli, we understand and cater to the specific needs of our community."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Always Connected",
      description: "Got a question? Need a specific item? Just drop us a WhatsApp message!"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg-warm py-20 lg:py-32">
        <div className="container-main text-center">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">Welcome to Archu Mart</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto leading-tight">
            Your Everyday Store in Sakoli
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            Providing fresh produce, quality groceries, and everyday essentials to the heart of Maharashtra. We are more than just a store; we are part of your community.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-card aspect-[4/3] relative bg-gray-200">
            {/* Placeholder for Store Image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 flex-col">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-medium text-lg">Archu Mart Storefront</p>
              <p className="text-sm">Store image goes here</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                Archu Mart began with a simple idea: to provide the people of Sakoli with a convenient, reliable, and friendly place to shop for their daily needs.
              </p>
              <p>
                Over the years, we've grown alongside our community. We take pride in knowing our customers by name and understanding exactly what they prefer. Whether it's the freshest vegetables for your morning meal or the perfect snacks for an evening gathering, Archu Mart is here to serve.
              </p>
              <p>
                We believe in fair pricing, exceptional quality, and service that makes you feel at home. That's the Archu Mart promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">We strive to make every shopping experience delightful.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding container-main text-center">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-10 md:p-16 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience the best?</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Visit our store in Sakoli today or browse our online catalog and order directly via WhatsApp!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/shop" className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-8 py-4 rounded-full transition-colors text-lg">
                Browse Shop
              </a>
              <a 
                href="https://wa.me/919356603316" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white hover:bg-[#20bd5a] font-medium px-8 py-4 rounded-full transition-colors text-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> Message on WhatsApp
              </a>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>
      </section>
    </div>
  );
};

export default About;
