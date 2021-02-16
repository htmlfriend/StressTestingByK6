import http from "k6/http";
import { check } from "k6";

export let options = {
  scenarios: {
    make_order: {
      //executor "constant-arrival-rate"
      executor: "ramping-arrival-rate",
      startRate: 10,
      timeUnit: "1m",
      gracefulStop: "0s",
      preAllocatedVUs: 15,
      maxVUs: 60,
      exec: "make_order",
      stages: [
        { duration: "1s", target: 20 },
        { duration: "10m", target: 20 },
        { duration: "1s", target: 30 },
        { duration: "10m", target: 30 },
        { duration: "1s", target: 40 },
        { duration: "10m", target: 40 },
        { duration: "1s", target: 50 },
        { duration: "10m", target: 50 },
        { duration: "1s", target: 60 },
        { duration: "10m", target: 60 },
      ],
    },
  },
};

export function make_order() {
  var url = "http://185.233.0.230:3000/";

  var payload = JSON.stringify({
    adress: "Moscow",
    cartItems: [],
    email: "sss@gmail.com",
    name: "ssss",
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
}
