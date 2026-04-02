import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FiCalendar,
  FiCopy,
  FiGift,
  FiInstagram,
  FiMapPin,
  FiMessageCircle,
  FiMusic,
  FiPause,
  FiPhone,
  FiSend,
  FiVideo,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi';
import '../App.css';

const EVENT_DATE = new Date('2026-12-31T08:00:00+07:00');

const galleryImages = [
  '/images/ideas1.jpg',
  '/images/ideas2.jpg',
  '/images/ideas3.jpg',
  '/images/ideas4.jpg',
  '/images/ideas5.jpg',
  '/images/ideas6.jpg',
  '/images/ideas7.jpg',
  '/images/ideas8.jpg',
];

const eventCards = [
  {
    title: 'Pemberkatan',
    time: '08.00 - 10.00 WIB',
    date: 'Kamis, 31 Desember 2026',
    address: 'GKPI Medan Kota, Jl. Letjen Jamin Ginting, Medan, Sumatera Utara',
    button: 'Lihat Lokasi',
  },
  {
    title: 'Resepsi',
    time: '11.00 WIB - selesai',
    date: 'Kamis, 31 Desember 2026',
    address: 'Ballroom Bulan Purnama, Medan Tuntungan, Sumatera Utara',
    button: 'Buka Maps',
  },
  {
    title: 'Live Streaming',
    time: 'Mulai pukul 08.00 WIB',
    date: 'Siaran virtual untuk keluarga dan sahabat',
    address: 'Tersedia melalui Instagram Live dan YouTube Live',
    button: 'Buka Streaming',
  },
];

const initialComments = [
  { name: 'Keluarga Simanjuntak', message: 'Selamat menempuh hidup baru. Tuhan memberkati rumah tangga kalian.' },
  { name: 'Sahabat Kampus', message: 'Akhirnya hari bahagia tiba. Lancar sampai hari-H.' },
];

function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('2');
  const [rsvpStatus, setRsvpStatus] = useState('Hadir');
  const [wishName, setWishName] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [comments, setComments] = useState(initialComments);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  const audioRef = useRef(null);
  const contentRef = useRef(null);

  function getTimeRemaining() {
    const now = new Date();
    const diff = EVENT_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (!isOpened) {
      root.classList.add('scroll-locked');
      body.classList.add('scroll-locked');
    } else {
      root.classList.remove('scroll-locked');
      body.classList.remove('scroll-locked');
    }

    return () => {
      root.classList.remove('scroll-locked');
      body.classList.remove('scroll-locked');
    };
  }, [isOpened]);

  const stats = useMemo(
    () => [
      { value: '31', label: 'Tanggal Acara' },
      { value: '12', label: 'Bulan Desember' },
      { value: '2026', label: 'Tahun Bahagia' },
    ],
    []
  );

  const handleOpenInvitation = async () => {
    setIsOpened(true);

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        setIsPlaying(false);
      }
    }

    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const toggleAudio = async () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const openUrl = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSaveDate = () => {
    const eventTitle = 'Pernikahan Bulan & Bintang';
    const startTime = '20261231T010000Z';
    const endTime = '20261231T050000Z';
    const details = 'Kami mengundang Anda untuk hadir di hari bahagia kami.';
    const location = 'Medan, Sumatera Utara';

    const googleCalendarUrl =
      `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(eventTitle)}` +
      `&dates=${startTime}/${endTime}` +
      `&details=${encodeURIComponent(details)}` +
      `&location=${encodeURIComponent(location)}`;

    openUrl(googleCalendarUrl);
  };

  const handleRsvpSubmit = (event) => {
    event.preventDefault();

    const message =
      `Halo, saya ${rsvpName}.%0A` +
      `Konfirmasi: ${rsvpStatus}.%0A` +
      `Jumlah tamu: ${rsvpGuests} orang.`;

    openUrl(`https://wa.me/6285270106090?text=${message}`);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      window.alert('Berhasil disalin.');
    } catch (error) {
      window.alert('Gagal menyalin teks.');
    }
  };

  const handleShareLink = async () => {
    const link = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Undangan Pernikahan Bulan & Bintang',
          text: 'Kami mengundang Anda di hari bahagia kami.',
          url: link,
        });
        return;
      } catch (error) {
        // Fallback to clipboard if share is canceled or unavailable.
      }
    }

    handleCopy(link);
  };

  const handleWishSubmit = () => {
    if (!wishName.trim() || !wishMessage.trim()) {
      window.alert('Isi nama dan ucapan terlebih dahulu.');
      return;
    }

    setComments((prev) => [{ name: wishName.trim(), message: wishMessage.trim() }, ...prev]);
    setWishName('');
    setWishMessage('');
  };

  return (
    <div className="invitation-shell">
      <audio ref={audioRef} src="/musik/weddingsound.mp3" loop />

      <section className="hero-section">
        <img src="/images/savethedate.jpg" alt="Bulan dan Bintang" className="hero-background" />
        <div className="hero-backdrop" />
        <div className="hero-card">
          <p className="eyebrow">The Wedding Invitation</p>
          <h1>Bulan &amp; Bintang</h1>
          <p className="hero-date">Kamis, 31 Desember 2026</p>
          <div className="guest-pill">
            <span>Kepada Yth.</span>
            <strong>Bapak / Ibu / Saudara(i)</strong>
            <span>Nama Tamu</span>
          </div>
          <p className="hero-copy">
            Dengan penuh sukacita kami mengundang Anda untuk hadir dan menjadi bagian dari hari
            bahagia kami.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={handleOpenInvitation}>
              <FiSend /> Buka Undangan
            </button>
            <button className="secondary-button" type="button" onClick={handleShareLink}>
              <FiSend /> Bagikan Link
            </button>
          </div>
        </div>
      </section>

      <main ref={contentRef} className={`page-content ${isOpened ? 'is-open' : ''}`}>
        <section className="story-section">
          <div className="section-heading">
            <p className="eyebrow">Save The Date</p>
            <h2>Hari yang kami nantikan</h2>
            <p>
              Sebuah perayaan kasih, doa, dan kebersamaan. Kami berharap kehadiran Anda menambah
              sukacita pada momen sakral ini.
            </p>
          </div>

          <div className="story-layout">
            <div className="highlight-card">
              <span className="highlight-label">Wedding Day</span>
              <h3>31 Desember 2026</h3>
              <p>Medan, Sumatera Utara</p>
              <button className="outline-button" type="button" onClick={handleSaveDate}>
                <FiCalendar /> Save the Date
              </button>
            </div>

            <div className="stat-grid">
              {stats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="countdown-section">
          <div className="section-heading light">
            <p className="eyebrow">Countdown</p>
            <h2>Menuju hari bahagia</h2>
          </div>
          <div className="countdown-grid">
            <div className="count-box">
              <strong>{timeRemaining.days}</strong>
              <span>Hari</span>
            </div>
            <div className="count-box">
              <strong>{timeRemaining.hours}</strong>
              <span>Jam</span>
            </div>
            <div className="count-box">
              <strong>{timeRemaining.minutes}</strong>
              <span>Menit</span>
            </div>
            <div className="count-box">
              <strong>{timeRemaining.seconds}</strong>
              <span>Detik</span>
            </div>
          </div>
        </section>

        <section className="couple-section">
          <div className="section-heading">
            <p className="eyebrow">The Couple</p>
            <h2>Mempelai</h2>
            <p>Kiranya kasih Tuhan menyertai langkah kami dalam membangun rumah tangga.</p>
          </div>

          <div className="couple-grid">
            <article className="person-card">
              <img src="/images/bride.jpg" alt="Bulan Purnama" />
              <div className="person-card__content">
                <span className="person-role">The Bride</span>
                <h3>Bulan Purnama</h3>
                <p>Putri dari Bapak Bumi &amp; Ibu Mars</p>
                <button
                  className="text-button"
                  type="button"
                  onClick={() => openUrl('https://www.instagram.com/')}
                >
                  <FiInstagram /> Instagram
                </button>
              </div>
            </article>

            <div className="ampersand-mark">&amp;</div>

            <article className="person-card">
              <img src="/images/groom.jpg" alt="Bintang Kejora" />
              <div className="person-card__content">
                <span className="person-role">The Groom</span>
                <h3>Bintang Kejora</h3>
                <p>Putra dari Bapak Langit &amp; Ibu Matahari</p>
                <button
                  className="text-button"
                  type="button"
                  onClick={() => openUrl('https://www.instagram.com/')}
                >
                  <FiInstagram /> Instagram
                </button>
              </div>
            </article>
          </div>
        </section>

        <section className="events-section">
          <div className="section-heading">
            <p className="eyebrow">Rangkaian Acara</p>
            <h2>Detail acara</h2>
            <p>Silakan pilih sesi yang ingin Anda hadiri atau saksikan secara virtual.</p>
          </div>

          <div className="events-grid">
            {eventCards.map((item) => (
              <article className="event-card" key={item.title}>
                <span className="event-badge">{item.title}</span>
                <h3>{item.date}</h3>
                <p className="event-time">{item.time}</p>
                <p>{item.address}</p>
                <button
                  className="outline-button"
                  type="button"
                  onClick={() =>
                    openUrl(
                      item.title === 'Live Streaming'
                        ? 'https://www.youtube.com/'
                        : 'https://maps.google.com/?q=Medan'
                    )
                  }
                >
                  {item.title === 'Live Streaming' ? <FiVideo /> : <FiMapPin />}
                  {item.button}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section">
          <div className="section-heading">
            <p className="eyebrow">Gallery</p>
            <h2>Momen kebersamaan</h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <figure className="gallery-item" key={image}>
                <img src={image} alt={`Gallery ${index + 1}`} />
              </figure>
            ))}
          </div>
        </section>

        <section className="video-section">
          <div className="section-heading">
            <p className="eyebrow">Love Story</p>
            <h2>Saksikan perjalanan kami</h2>
          </div>
          <div className="video-frame">
            <iframe
              title="Love Story"
              src="https://www.youtube.com/embed/QMForPSc-Mc?mute=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        <section className="support-grid">
          <form className="panel-card" onSubmit={handleRsvpSubmit}>
            <div className="section-heading align-left compact">
              <p className="eyebrow">RSVP</p>
              <h2>Konfirmasi kehadiran</h2>
              <p>Bantu kami mempersiapkan acara dengan konfirmasi yang akurat.</p>
            </div>

            <label htmlFor="rsvp-name">Nama</label>
            <input
              id="rsvp-name"
              type="text"
              value={rsvpName}
              onChange={(event) => setRsvpName(event.target.value)}
              placeholder="Tulis nama Anda"
              required
            />

            <label htmlFor="rsvp-guests">Jumlah Tamu</label>
            <select
              id="rsvp-guests"
              value={rsvpGuests}
              onChange={(event) => setRsvpGuests(event.target.value)}
            >
              <option value="1">1 orang</option>
              <option value="2">2 orang</option>
              <option value="3">3 orang</option>
              <option value="4">4 orang</option>
              <option value="5">5 orang</option>
            </select>

            <label htmlFor="rsvp-status">Konfirmasi</label>
            <select
              id="rsvp-status"
              value={rsvpStatus}
              onChange={(event) => setRsvpStatus(event.target.value)}
            >
              <option value="Hadir">Saya akan hadir</option>
              <option value="Belum pasti">Masih tentatif</option>
              <option value="Tidak hadir">Mohon maaf tidak bisa hadir</option>
            </select>

            <button className="primary-button full-width" type="submit">
              <FiMessageCircle /> Kirim ke WhatsApp
            </button>
          </form>

          <div className="panel-card">
            <div className="section-heading align-left compact">
              <p className="eyebrow">Wedding Gift</p>
              <h2>Tanda kasih</h2>
              <p>Doa restu Anda sudah sangat berarti. Jika berkenan, Anda juga dapat mengirimkan hadiah.</p>
            </div>

            <div className="gift-card">
              <FiGift />
              <div>
                <strong>Bintang Kejora</strong>
                <span>Bank BCA - 120 120 120 120</span>
              </div>
              <button type="button" className="icon-button" onClick={() => handleCopy('120120120120 a.n Bintang Kejora')}>
                <FiCopy />
              </button>
            </div>

            <div className="gift-card">
              <FiGift />
              <div>
                <strong>Bulan Purnama</strong>
                <span>Bank Mandiri - 987 654 321 000</span>
              </div>
              <button type="button" className="icon-button" onClick={() => handleCopy('987654321000 a.n Bulan Purnama')}>
                <FiCopy />
              </button>
            </div>

            <div className="gift-address">
              <strong>Kirim Kado</strong>
              <p>Jl. Pintu Air IV No. 24, Medan Johor, Sumatera Utara 20142</p>
              <button
                type="button"
                className="outline-button"
                onClick={() => handleCopy('Jl. Pintu Air IV No. 24, Medan Johor, Sumatera Utara 20142')}
              >
                <FiCopy /> Copy Alamat
              </button>
            </div>
          </div>
        </section>

        <section className="wishes-section">
          <div className="panel-card wishes-panel">
            <div className="section-heading align-left compact">
              <p className="eyebrow">Ucapan &amp; Doa</p>
              <h2>Tinggalkan pesan terbaik Anda</h2>
              <p>{comments.length} ucapan telah dikirimkan.</p>
            </div>

            <div className="wish-form">
              <input
                type="text"
                placeholder="Nama"
                value={wishName}
                onChange={(event) => setWishName(event.target.value)}
              />
              <textarea
                placeholder="Tulis ucapan dan doa"
                value={wishMessage}
                onChange={(event) => setWishMessage(event.target.value)}
                rows="4"
              />
              <button className="primary-button full-width" type="button" onClick={handleWishSubmit}>
                <FiSend /> Kirim Ucapan
              </button>
            </div>

            <div className="wishes-list">
              {comments.map((comment, index) => (
                <article className="wish-card" key={`${comment.name}-${index}`}>
                  <strong>{comment.name}</strong>
                  <p>{comment.message}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="footer">
          <div>
            <p className="eyebrow footer-eyebrow">Created with love</p>
            <h3>Undangan Digital Bulan &amp; Bintang</h3>
          </div>
          <div className="footer-links">
            <a href="https://www.instagram.com/riski" target="_blank" rel="noreferrer">
              <FiInstagram />
            </a>
            <a href="https://wa.me/6285270106090" target="_blank" rel="noreferrer">
              <FiPhone />
            </a>
          </div>
          <p className="footer-copy">Copyright {new Date().getFullYear()} Riski Sembiring</p>
        </footer>
      </main>

      <div className="floating-controls">
        <button className="floating-button" type="button" onClick={toggleAudio}>
          {isPlaying ? <FiPause /> : <FiMusic />}
        </button>
        <button className="floating-button" type="button" onClick={() => setIsMuted((prev) => !prev)}>
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
      </div>
    </div>
  );
}

export default Header;
