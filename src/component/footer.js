import "../css/footer.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,

  faHome,

  faPhone,

} from "@fortawesome/free-solid-svg-icons";
function Footer() {
  return (
    <>
      <footer class="site-footer fl containersub">
        <div class="fl fl4">
          <div class="row fl">
            <div class="col-sm-12 col-md-6 fl2">
              <h6>Thông Tin</h6>
              <p class="text-justify">
                Memory&y <i> Chia sẻ những điều giản đơn trong cuộc sống . </i>{" "}
                Với sự phát triển không ngừng cuả cộng nghệ , công ty abc.xyz đã
                phát triển một sản phẩm giúp mọi người có thể tiến tới gần nhau
                hơn . "Tôi có thể và bạn cũng thế"
              </p>
            </div>

            <div class="col-xs-6 col-md-3 fl1">
              <h6>Liên Hệ</h6>
              <ul class="footer-links">
                <li>
                  <NavLink to="/">Facebook</NavLink>
                </li>
                <li>
                  <NavLink to="/">Zalo</NavLink>
                </li>
                <li>
                  <NavLink to="/">Slack</NavLink>
                </li>
                <li>
                  <NavLink to="/">Whatsapp</NavLink>
                </li>
                <li>
                  <NavLink to="/">Instagram</NavLink>
                </li>
              </ul>
            </div>

            <div class="col-xs-6 col-md-3 fl1">
              <h6>Liên Kết Nhanh</h6>
              <ul class="footer-links">
                <li>
                  <NavLink to="/">Trang Chủ</NavLink>
                </li>
                <li>
                  <NavLink to="/">Thông Tin</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div class="fl1">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <p class="copyright-text">
                Liên Hệ Với Chúng Tôi Qua &copy; Số Điện Thoại HOTLINE
                0333999222 Để Được Hỗ Trợ
              </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
              <ul class="social-icons">
                <li>
                  <NavLink to="/">
                    <FontAwesomeIcon
                      style={{ paddingRight: "5px" }}
                      icon={faPhone}
                    />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <FontAwesomeIcon
                      style={{ paddingRight: "5px" }}
                      icon={faHome}
                    />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <FontAwesomeIcon
                      style={{ paddingRight: "5px" }}
                      icon={faCircleInfo}
                    />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
