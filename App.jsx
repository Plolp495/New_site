import { useState } from 'react';
import './App.css';

const menuItems = [
  { id: 1, name: 'Эспрессо', desc: 'Классический крепкий кофе', price: 150, img: '☕' },
  { id: 2, name: 'Капучино', desc: 'Эспрессо с молочной пенкой', price: 220, img: '🥛' },
  { id: 3, name: 'Латте', desc: 'Нежный кофе с молоком', price: 240, img: '🍶' },
  { id: 4, name: 'Американо', desc: 'Эспрессо с горячей водой', price: 180, img: '🫖' },
  { id: 5, name: 'Мокко', desc: 'Кофе с шоколадом', price: 260, img: '🍫' },
  { id: 6, name: 'Флэт Уайт', desc: 'Двойной эспрессо с молоком', price: 250, img: '🧋' },
];

const gallery = ['🏪', '🪑', '🎨', '🪴', '📚', '🎵'];

function App() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <div className="logo">☕ Coffee House</div>
          <nav className="nav">
            <a href="#menu">Меню</a>
            <a href="#about">О нас</a>
            <a href="#gallery">Галерея</a>
            <a href="#contact">Контакты</a>
          </nav>
          <div className="cart-btn">
            🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-inner">
          <h1>Лучший кофе в городе</h1>
          <p>Свежеобжаренные зёрна, уютная атмосфера и улыбки бариста</p>
          <a href="#menu" className="btn">Посмотреть меню</a>
        </div>
      </section>

      <section id="menu" className="section">
        <div className="container">
          <h2 className="section-title">Наше меню</h2>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item.id} className="menu-card">
                <div className="menu-img">{item.img}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="menu-footer">
                  <span className="price">{item.price} ₽</span>
                  <button className="add-btn" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {cart.length > 0 && (
        <section className="section cart-section">
          <div className="container">
            <h2 className="section-title">Ваш заказ</h2>
            <div className="cart-list">
              {cart.map((item, i) => (
                <div key={i} className="cart-item">
                  <span>{item.img} {item.name}</span>
                  <span>{item.price} ₽</span>
                  <button className="remove-btn" onClick={() => removeFromCart(i)}>✕</button>
                </div>
              ))}
              <div className="cart-total">Итого: {total} ₽</div>
            </div>
          </div>
        </section>
      )}

      <section id="about" className="section about-section">
        <div className="container about-inner">
          <div className="about-text">
            <h2 className="section-title">О нас</h2>
            <p>Мы открылись в 2015 году с простой идеей — варить лучший кофе в городе. Наши бариста проходят обучение у международных экспертов, а зёрна мы привозим напрямую с плантаций Эфиопии, Колумбии и Бразилии.</p>
            <p>В нашем зале всегда уютно: мягкий свет, приятная музыка и запах свежего кофе создают атмосферу, в которую хочется возвращаться.</p>
          </div>
          <div className="about-stats">
            <div className="stat"><span className="stat-num">9</span><span>лет опыта</span></div>
            <div className="stat"><span className="stat-num">50+</span><span>сортов кофе</span></div>
            <div className="stat"><span className="stat-num">1000+</span><span>довольных гостей</span></div>
          </div>
        </div>
      </section>

      <section id="gallery" className="section">
        <div className="container">
          <h2 className="section-title">Галерея</h2>
          <div className="gallery-grid">
            {gallery.map((item, i) => (
              <div key={i} className="gallery-item">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Свяжитесь с нами</h2>
          <div className="contact-inner">
            <div className="contact-info">
              <p>📍 г. Москва, ул. Кофейная, 15</p>
              <p>📞 +7 (999) 123-45-67</p>
              <p>✉️ hello@coffeehouse.ru</p>
              <p>🕐 Пн-Вс: 8:00 – 22:00</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <textarea
                placeholder="Сообщение"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows="4"
              />
              <button type="submit" className="btn">Отправить</button>
              {sent && <p className="sent-msg">Спасибо! Мы свяжемся с вами.</p>}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>© 2024 Coffee House. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;