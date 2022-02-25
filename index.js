let isShowPanel = false;
let isHaveBeenClose = false;
const panel = $("#newsletter");
const notification = $("#notification");

function hideNotification() {
  notification.addClass("hide--notification");
}

function closePanel() {
  hidePanel();
  const date = new Date();
  date.setMinutes(date.getMinutes() + 5);
  localStorage.setItem("time-expired", JSON.stringify(date));
}

function hidePanel() {
  panel.removeClass("show--newsletter");
  panel.addClass("hide--newsletter");
}

function showPanel() {
  panel.removeClass("hide--newsletter");
  panel.addClass("show--newsletter");
}

function checkExpiration() {
  const expired = JSON.parse(localStorage.getItem("time-expired"));
  const current_time = JSON.parse(JSON.stringify(new Date()));
  if (expired) {
    isHaveBeenClose = true;
    if (expired < current_time) {
      localStorage.removeItem("time-expired");
      isHaveBeenClose = false;
    }
  } else {
    isHaveBeenClose = false;
  }
}

$(document).ready(function () {
  checkExpiration();
  $(window).scroll(function () {
    const currentPosition = $(window).scrollTop();
    const documentHeight = $(document).height() / 5;
    if (currentPosition >= documentHeight) {
      if (!isShowPanel && !isHaveBeenClose) {
        isShowPanel = true;
        showPanel();
      }
    }
  });
});
