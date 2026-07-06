export default function Reviews() {
  const reviews = [
    {
      name: "Amit Verma",
      review: "Best Quality Products and Fast Delivery.",
    },
    {
      name: "Priya Sharma",
      review: "Furniture Quality Bahut Achhi Hai.",
    },
    {
      name: "Rakesh Gupta",
      review: "TV aur Appliances Genuine Price par Mile.",
    },
  ];

  return (
    <section className="reviews">
      <h2>Customer Reviews</h2>

      <div className="reviews-grid">
        {reviews.map((item, index) => (
          <div key={index} className="review-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>

            <p className="review-text">
              {item.review}
            </p>

            <h4 className="review-name">
              - {item.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}