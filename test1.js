import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

export let options = {
  scenarios: {
    make_order: {
      executor: "constant-arrival-rate",
      rate: 100,
      timeUnit: "1h",
      duration: "1h",
      gracefulStop: "0s",
      preAllocatedVUs: 5,
      maxVUs: 10,
      exec: "make_order",
    },
  },
};

export function make_order() {
  var url = "http://185.233.0.230:3000/";

  var payload = JSON.stringify({
    adress: "Moscow",
    cartItems: [],
    email: "ssss@gmail.com",
    name: "sss",
  });

  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let resMain = http.get(url);
  check(resMain, {
    "is status 200": (r) => r.status === 200,
  });

  let resOrder = http.post(url + "api/orders", payload, params);
  check(resOrder, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(1);
}
