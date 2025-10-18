import React, { useState, useRef, useEffect } from 'react';
import { FiInstagram, FiPhone } from "react-icons/fi";
import '../App.css';

function Header() {
    const [showPage, setShowPage] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);
    const photosRef = useRef(null);
    let startX = 0;
    const [name, setName] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [nama, setNama] = useState('');
    const [ucapan, setUcapan] = useState('');
    const [hasil, setHasil] = useState('');
    const [comments, setComments] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    
      const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const moveX = e.touches[0].clientX;
    const diff = startX - moveX;

    // Geser kanan / kiri
    photosRef.current.scrollLeft += diff;
    startX = moveX;
  };

    const elementRef = useRef(null);
    const audioRef = useRef(null);
    const pageRef = useRef(null);

    const toggleVolume = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
          audioRef.current.muted = !isMuted;
        }
      };

    const handleButtonClick = () => {
        setIsAnimated(true);
        setIsVisible(!isVisible);
        setShowPage(!showPage);
        if (audioRef.current) {
            audioRef.current.play(); 
          }
        if (!showPage) {
          setTimeout(() => {
            pageRef.current.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      };

      const targetDate = new Date('2025-12-31T23:59:59'); // Target tanggal dan waktu

      const calculateTimeRemaining = () => {
        const now = new Date();
        const timeRemaining = targetDate - now;
    
        if (timeRemaining <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
        return { days, hours, minutes, seconds };
      };
    
      const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);
    
      useEffect(() => {
        const handleScroll = () => {
            if (elementRef.current) {
              const position = elementRef.current.getBoundingClientRect();

                window.addEventListener('scroll', handleScroll);
                handleScroll(); 

              if (position.top >= 0 && position.bottom <= window.innerHeight) {
                setIsVisible(true);
              } else {
                setIsVisible(false);
              }
            }
          };

        const interval = setInterval(() => {
          setTimeRemaining(calculateTimeRemaining());
        }, 1000); 
    
        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
          };
      }, []);
    
      const formatTime = (time) => {
        return `${time.days} ${time.hours} ${time.minutes} ${time.seconds}`;
      };

      const handleClick = () => {
        const eventTitle = "Wedding Event";
        const startTime = "20240821T080000Z";
        const endTime = "20240821T090000Z"; 
        const details = "Join us for our wedding event!";
        const location = "123 Wedding Venue, City, Country";
    
        const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
        window.open(googleCalendarUrl, '_blank');
      };

      const btnInstagram = () => {
        const instagramLink = `https://www.instagram.com/`
        window.open(instagramLink,  '_blank');
      }

      const btnMaps = () => {
        const MapsLink = `https://maps.google.com`
        window.open(MapsLink,  '_blank');
      }

      const btnLiveYt = () => { 
        const linkYt = `https://www.youtube.com/`
        window.open(linkYt,  '_blank');
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const message = `Nama: ${name}\nJumlah Orang: ${numberOfPeople}\nKonfirmasi: ${confirmation}`;
        const phoneNumber = '1234567890'; 
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');

        setName('');
        setNumberOfPeople('');
        setConfirmation('');
      }

      const copyText = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`${text} Berhasil disalin!`);
        });
    };

    const handleKirim = () => {
        if (nama && ucapan) {
          setComments([...comments, { nama, ucapan }]);
          setNama('');
          setUcapan('');
          setHasil(`${nama}: ${ucapan}`);
        } else {
          alert('Harap isi nama dan ucapan terlebih dahulu.');
        }
      };
  return (
    <header className="App-header">
      <div className="invitation-container">
        <div className="image-overlay">
          <img src="/images/savethedate.jpg" alt="Background" className="background-image" />
          <div className="overlay-text">
            <h1>Bulan & Bintang</h1>
            <p>Kepada Yth</p>
            <p>Bapak/Ibu/Saudara/i</p>
            <h2>Nama Tamu</h2>
            <button
              className={`open-invitation ${isVisible ? 'hidden' : ''}`}
              onClick={handleButtonClick}
            >
              ✉️ Buka Undangan
            </button>
            <audio ref={audioRef} src="./musik/weddingsound.mp3" autoPlay loop />
          </div>
        </div>
      </div>

      <div
        ref={pageRef}
        className={`page-content ${showPage ? '' : 'hide'}`}
      >
<div className="save-the-date-container">
      <div
        ref={photosRef}
        className={`photos ${isAnimated ? "animate" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="photo">
          <img src="./images/download1.jpg" alt="Photo 1" />
        </div>

        <div className="photo">
          <div className="center-text">
            <h1>Save The Date</h1>
            <div className="horizontal-date">
              <span>Minggu, 31 Desember 2025</span>
            </div>
            <h2>BULAN & BINTANG</h2>
          </div>
          <img src="./images/download2.jpg" alt="Photo 2" />
        </div>

        <div className="photo">
          <img src="./images/download3.jpg" alt="Photo 3" />
        </div>

      </div>
    </div>
        <body>
        <div className="countdown">
            <div className={`textCoundown ${isAnimated ? 'animate2' : ''}`}>Countdown</div>
            <div className={`formatTime ${isAnimated ? 'animate2' : ''}`}>
                <span className="time-part">{timeRemaining.days} Hari</span>
                <span className="time-part">{timeRemaining.hours} Jam</span>
                <span className="time-part">{timeRemaining.minutes} Menit</span>
                <span className="time-part">{timeRemaining.seconds} Detik</span>
            </div>
            <button className={`savedate ${isAnimated ? 'animate2' : ''}`} onClick={() => handleClick()} style={{marginTop: '20px'}}>📆 Save The Date</button>
        </div>
        <br></br>
        <div class="container">
        <div class="header-text">
            <p>Salam Damai Sejahtera dalam Kasih Kristus</p>
            <p>Segala puji dan syukur kami panjatkan kepada Tuhan Yesus Kristus
                yang telah mempersatukan kami dalam cinta kasih-Nya. 
                kiranya berkat dan kasih karunianya Menyertai pernikahan kami, Amin.</p>
        </div>
        <div class="bride-section">
            <div class="bride-title">
                <span style={{fontFamily: 'Great Vibes'}}>The Bride</span>
            </div>
            <img src="./images/bride.jpg" alt="Bulan Purnama" class="bride-image"/>
            <div class="bride-info">
                <h2>Bulan Purnama</h2>
                <div class="instagram">
                    <img src="./images/ig.png" alt="Instagram" onClick={() => btnInstagram()}/>
                </div>
                <p>Putri dari<br></br>Bapak Bumi & Ibu Mars</p>
            </div>
        </div>
        <div class="ampersand">
            <span>&</span>
        </div>
        <div class="groom-section">
            <div class="groom-title">
                <span style={{fontFamily: 'Great Vibes'}}>The Groom</span>
            </div>
            <img src="./images/groom.jpg" alt="Bintang Kejora" className="groom-image"/>
            <div class={`groom-info ${isAnimated ? 'animate' : ''}`}>
                <h2>Bintang Kejora</h2>
                <div class="instagram">
                    <img src="./images/ig.png" alt="Instagram" onClick={() => btnInstagram()}/>
                </div>
                <p>Putra dari<br></br>Bapak Langit & Ibu Matahari</p>
            </div>
        </div>
    </div><br></br>
<div className="save-the-date">
  {/* Gambar background */}
  <img src="/images/ideas1.jpg" alt="Save The Date Background" className="background-image" />

  {/* Isi konten di atas gambar */}
  <div className="overlay-content">
    <h2>Save The Date</h2>
    <p>
      "Semoga Tuhan Yesus Kristus menyertai acara ini dan dapat terlaksana dengan baik
      dan penuh berkat, amin."
    </p>

    <div className="event">
      <h3>Pemberkatan Nikah</h3>
      <div className="date">
        <span>Minggu | </span>
        <span>31 | </span>
        <span>Desember | </span>
        <span>2024</span>
      </div>
      <div className="time">
        <span>08.00 WIB - 10.00 WIB</span>
        <br /><br />
        <span>
          Jln Letjen Jamin Ginting, Medan Tuntungan, Sidomulyo, Medan, Kota Medan,
          Sumatera Utara 20137
        </span>
      </div>
      <a onClick={() => btnMaps()} className={`btn ${showPage ? '' : 'hide'}`}>
        Google Maps
      </a>
    </div>

    <div className="event">
      <h3>Resepsi Pernikahan</h3>
      <div className="date">
        <span>Minggu | </span>
        <span>31 | </span>
        <span>Desember | </span>
        <span>2024</span>
      </div>
      <div className="time">
        <span>10.00 WIB - selesai</span>
        <br /><br />
        <span>Jln-Jln terosss</span>
      </div>
      <a onClick={() => btnMaps()} className={`btn ${showPage ? '' : 'hide'}`}>
        Google Maps
      </a>
    </div>

    <div className="event">
      <h3>Live Streaming</h3>
      <div className="date">
        <span style={{ fontSize: '16px', fontWeight: 'normal' }}>
          Temui kami secara virtual untuk menyaksikan acara pernikahan kami yang akan
          disiarkan langsung dengan menekan tombol di bawah ini:
        </span>
      </div>
      <div className="livecontainer">
        <a onClick={() => btnInstagram()} className={`btn ${showPage ? '' : 'hide'}`}>
          Live di Instagram
        </a>
        <a onClick={() => btnLiveYt()} className={`btn ${showPage ? '' : 'hide'}`}>
          Live di Youtube
        </a>
      </div>
    </div>
  </div>
</div>

    <div className="gallery-container">
      <h2 style={{fontFamily: 'Great Vibes'}} className="gallery-title">Our Gallery</h2>
      <div className="image-grid">
        <img src="/images/ideas1.jpg" alt="Gallery 1" />
        <img src="/images/ideas2.jpg" alt="Gallery 2" />
        <img src="/images/ideas3.jpg" alt="Gallery 3" />
        <img src="/images/ideas4.jpg" alt="Gallery 4" />
        <img src="/images/ideas5.jpg" alt="Gallery 5" />
        <img src="/images/ideas6.jpg" alt="Gallery 6" />
        <img src="/images/ideas7.jpg" alt="Gallery 7" />
        <img src="/images/ideas8.jpg" alt="Gallery 8" />
        <img src="/images/savethedate.jpg" alt="Gallery 9" />
      </div>

      <h2 style={{fontFamily: 'Great Vibes'}} className="gallery-title">Love Story</h2>
      <div className="video-section">
        <div className="video-container">
          <iframe
            className={`videoYt ${showPage ? '' : 'hide'}`}
            width="1000"
            height="500"
            src="https://www.youtube.com/embed/QMForPSc-Mc?autoplay=1&mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form-konfirmwa" style={{textAlign: 'left'}}>
      <h2 style={{fontFamily: 'Great Vibes'}}>RSVP</h2>
      <p>Konfirmasi kehadiranmu pada acara kami :</p>
      <div>
        <label class='mandatory'>
          Nama
          </label>
          <input
            type="text"
            value={name}
            className={`konfirmwa ${showPage ? '' : 'hide'}`}
            onChange={(e) => setName(e.target.value)}
            required
          />
      </div><br></br>
      <div>
        <label class='mandatory'>
          Jumlah Orang
          </label>
          <select
            className={`konfirmwa ${showPage ? '' : 'hide'}`}
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            required
          >
            <option value="">Pilih...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
      </div><br></br>
      <div>
        <label class='mandatory'>
          Konfirmasi
          </label>
          <select
            className={`konfirmwa ${showPage ? '' : 'hide'}`}
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            required
          >
            <option value="">Pilih...</option>
            <option value="Iya, saya akan datang">Iya, saya akan datang</option>
            <option value="Maaf, saya tidak bisa datang">Maaf, saya tidak bisa datang</option>
          </select>
      </div>
      <button className={`konfirmwa ${showPage ? '' : 'hide'}`} type="submit">Konfirmasi ke WhatsApp</button>
    </form><br></br><br></br>
    <div className="container">
            <h2 style={{fontFamily: 'Great Vibes'}}>Wedding Gift</h2>
            <p>Tanpa mengurangi rasa hormat, bagi anda yang ingin memberikan tanda kasih untuk kami, dapat melalui:</p>
            
            <div className="section">
                <p className="card">
                    Bintang Kejora<br/><br/>
                    Jln. Pintu Air IV No. 24 RT. 01 RW. 01, Medan Johor, Sumut 20142<br/><br/>
                    <button onClick={() => copyText('Bintang Kejora\nJln. Pintu Air IV No. 24 RT. 01 RW. 01, Medan Johor, Sumut 20142')} className="button">
                        Copy Alamat
                    </button>
                </p>
            </div>
            <div className="section">
                <div class="cardVisa">
                    <div class="card-content">
                        <p>120 120 120 120</p>
                        <button onClick={() => copyText('120 120 120 120 a.n Bintang Kejora')} class="button">Copy Nomor</button>
                        <p>a.n Bintang Kejora</p>
                    </div>
                </div><br></br>
                <div class="section">
                <div class="cardVisa">
                    <div class="card-content">
                        <p>120 120 120 120</p>
                        <button onClick={() => copyText('120 120 120 120 a.n Bulan Purnama')} class="button">Copy Nomor</button>
                        <p>a.n Bulan Purnama</p>
                    </div>
                </div>
            </div>
            <p style={{fontWeight: 'bold', fontFamily: 'Great Vibes', fontSize: '24px'}}>Terima Kasih</p>
        </div>
    </div>
    </div>
    
    <div className="ucapan-doa">
      <h2 style={{fontFamily: 'Great Vibes'}}>Ucapan & Doa</h2>
      <div className="comment-count">{comments.length} Comment{comments.length !== 1 ? 's' : ''}</div>
      
      <div className="form-group">
        <input
        placeholder='Nama'
          type="text"
          id="nama"
          className="form-control"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder='Ucapan'
          id="ucapan"
          className="form-control"
          value={ucapan}
          onChange={(e) => setUcapan(e.target.value)}
        ></textarea>
      </div>      
      <button onClick={handleKirim} className="submit-button">
        Kirim Ucapan
      </button>
      
      {hasil && <div id="hasil" className="hasil-ucapan">{hasil}</div>}
    </div>

    <footer className="footer">
          <p className="creator">Created by <strong>Riski Sembiring</strong></p>

          <div className="social-icons">
            <a
              href="https://www.instagram.com/riski"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram className="icon" />
            </a>
            <a
              href="https://wa.me/6285270106090"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiPhone className="icon" />
            </a>
          </div>

          <p className="copyright">
            Copyright © {new Date().getFullYear()} Undangan Digital
          </p>
        </footer>

    <button className="volume-button" onClick={toggleVolume}>
      {isMuted ? '🔇' : '🔊'}
    </button>
    </body>
    </div>  
    </header>
  );
}

export default Header;
