import "../App.css";


export default function GalleryPage() {

  const images = [
    "/maa bg.jpeg",
    "/maa.png",
    "/maa bg.jpeg",
    "/maa.png",
    "/maa bg.jpeg",
    "/maa.png",
  ];

  return (
    <section className="gallery-page">

      <h1>Our Gallery</h1>

      <div className="gallery-grid">

        {images.map((img,index)=>(
          <div className="gallery-card" key={index}>
            <img src={img} alt="" />
          </div>
        ))}

      </div>

    </section>
  );
}