// export function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// export function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();

//   // Đặt thêm thuộc tính sameSite và secure
//   let cookieString =
//     cname + "=" + cvalue + ";" + expires + ";path=/;sameSite=none;secure";

//   document.cookie = cookieString;
// }

// export function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();

//   let domain = ".onrender.com";
//   // Đặt thêm thuộc tính sameSite và secure
//   let cookieString =
//     cname +
//     "=" +
//     cvalue +
//     ";" +
//     expires +
//     ";path=/;domain=" +
//     domain +
//     ";sameSite=none;secure";

//   document.cookie = cookieString;
// }
// export function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();

//   let domain = "";
//   // Đặt thêm thuộc tính sameSite và secure
//   let cookieString =
//     cname +
//     "=" +
//     cvalue +
//     ";" +
//     expires +
//     ";path=/;domain=" +
//     domain +
//     ";sameSite=none;secure";

//   document.cookie = cookieString;
// }

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// export const delete_cookie = function (name) {
//   document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
// };

export const delete_cookie = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};