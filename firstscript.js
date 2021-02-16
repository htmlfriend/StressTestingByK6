import http from "k6/http";
import { sleep } from "k6";

export default function () {
  http.get("http://ya.ru");
  console.log("Yandes");

  http.get("http://tsst.k6.io/");
  console.log("k6");

  sleep(1);
}
// 185.2333.0.230:3000 sussi site for tranning
