
import "./Footer.css"
const Footer = () => {
  return (
     <>
       <div className="footerCont">
            <div className="leftfooter">
                <div className="firstleft">
                    <h4>INFO</h4>
                       <a href="#" className="format">Formats</a>
                       <a href="#" className="format">Compression</a>
                       <a href="#" className="format">Pricing</a>
                       <a href="#" className="format">FAQ</a>
                       <a href="#" className="format">Status</a>
                </div>

                <div className="firstleft">
                    <h4>RESOURCES</h4>
                       <a href="#" className="format">Developer API</a>
                       <a href="#" className="format">Tools</a>
                       <a href="#" className="format">Blog</a>
                </div>

                <div className="firstleft">
                    <h4>COMPANY</h4>
                       <a href="#" className="format">About Us</a>
                       <a href="#" className="format">Sustainability</a>
                       <a href="#" className="format">Terms of Service</a>
                       <a href="#" className="format">Privacy</a>
                </div>
            </div>

            <div className="rightfooter">
                <h5>Follow Us</h5>
                <div className="socials">
                <div className="tooltip-container">
  <div className="tooltip">
    <div className="profile">
      <div className="user">
        <div className="img">ZO</div>
        <div className="details">
          <div className="name">Zion</div>
          <div className="username">@Zion Omogbeme</div>
        </div>
      </div>
      <div className="about">300+ Connections</div>
    </div>
  </div>
  <div className="text">
    <a className="icon" href="https://www.linkedin.com/in/zion-omogbeme-43021b359/">
      <div className="layer">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span className="fab fa-linkedin">
          <svg viewBox="0 0 448 512" height="1em">
            <path
              d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
            ></path>
          </svg>
        </span>
      </div>
      <div className="text">LinkedIn</div>
    </a>
  </div>
</div>



 <div className="fb-tooltip-container">
  <div className="fb-tooltip">
    <div className="fb-profile">
      <div className="fb-user">
        <div className="fb-img">ZO</div>
        <div className="fb-details">
          <div className="fb-name">Zion</div>
          <div className="fb-username">@Zion Omogbeme</div>
        </div>
      </div>
      <div className="fb-about">6+ Friends</div>
    </div>
  </div>
  <div className="fb-text">
    <a className="fb-icon" href="https://web.facebook.com/profile.php?id=100092347194361">
      <div className="fb-layer">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span className="facebookSVG">
          <svg
            viewBox="0 0 40 40"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <linearGradient
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(40 0 0 -39.7778 11115.001 16212.334)"
              y2="407.5726"
              y1="406.6018"
              x2="-277.375"
              x1="-277.375"
              id="a"
            >
              <stop stopColor="#0062e0" offset="0"></stop>
              <stop stopColor="#19afff" offset="1"></stop>
            </linearGradient>
            <path
              d="M16.7 39.8C7.2 38.1 0 29.9 0 20 0 9 9 0 20 0s20 9 20 20c0 9.9-7.2 18.1-16.7 19.8l-1.1-.9h-4.4l-1.1.9z"
              fill="url(#a)"
            ></path>
            <path
              d="m27.8 25.6.9-5.6h-5.3v-3.9c0-1.6.6-2.8 3-2.8H29V8.2c-1.4-.2-3-.4-4.4-.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1c1.1.2 2.2.3 3.3.3 1.1 0 2.2-.1 3.3-.3V25.6h4.4z"
              fill="#fff"
            ></path>
          </svg>
        </span>
      </div>
      <div className="fb-text">Facebook</div>
    </a>
  </div>
</div>

<div className="ig-tooltip-container">
  <div className="ig-tooltip">
    <div className="ig-profile">
      <div className="ig-user">
        <div className="ig-img">ZO</div>
        <div className="ig-details">
          <div className="ig-name">Zion</div>
          <div className="ig-username">@master_zeeeeee</div>
        </div>
      </div>
      <div className="ig-about">10+ Followers</div>
    </div>
  </div>
  <div className="ig-text">
    <a className="ig-icon" href="https://www.instagram.com/master_zeeeeee/">
      <div className="ig-layer">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span className="instagramSVG">
          <svg
            fill="white"
            className="svgIcon"
            viewBox="0 0 448 512"
            height="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
            ></path>
          </svg>
        </span>
      </div>
      <div className="ig-text">Instagram</div>
    </a>
  </div>
</div>
</div>


            </div>
       </div>
     </>
  )
}

export default Footer