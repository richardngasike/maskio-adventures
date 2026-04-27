import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Gallery — Masikio Adventures',
  description: 'Wildlife and safari photography from the Maasai Mara.',
};

const galleryItems = [
  { src: '/images/gallery/gallery1.png', caption: 'The Great Migration crossing the Mara River' },
  { src: '/images/gallery/gallery2.png', caption: 'Lion pride at golden hour' },
  { src: '/images/gallery/gallery3.png', caption: 'Elephant herd at the watering hole' },
  { src: '/images/gallery/gallery4.png', caption: 'Hot air balloon over the savannah' },
  { src: '/images/gallery/gallery5.png', caption: 'Maasai warrior at sunset' },
  { src: '/images/gallery/gallery6.png', caption: 'Cheetah on the hunt' },
  { src: '/images/gallery/gallery7.png', caption: 'Bush sundowner dinner setup' },
  { src: '/images/gallery/gallery8.png', caption: 'Zebra migration across the plains' },
  { src: '/images/gallery/gallery9.png', caption: 'Luxury tented camp interior' },
  { src: '/images/gallery/gallery10.png', caption: 'Giraffe against acacia trees' },
  { src: '/images/gallery/gallery11.png', caption: 'Morning game drive team' },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: 'url(/images/gallery/balloon.png)' }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <a href="/">Home</a> <span>›</span> <span>Gallery</span>
          </div>
          <h1 className="page-hero-title">Life in the Mara</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Visual Stories</span>
            <h2 className="section-title">A Thousand Words<br />Captured in One Frame</h2>
            <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
              Every image is a memory from the Mara — moments that await you on your own Masikio safari.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item, i) => (
              <div key={i} className="gallery-item">
                <img src={item.src} alt={item.caption} />
                <div className="gallery-item-overlay">
                  <span>🔍</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
