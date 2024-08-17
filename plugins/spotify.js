var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cheerio from "cheerio";
import axios from "axios";
import FormData from "form-data";
// ? Scrape
/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @description Any Request? Contact me : vielynian@gmail.com
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
export function spotify(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const a = cheerio.load((yield axios.get("https://spotifymate.com/en", {
                    headers: {
                        cookie: "session_data=o8079end5j9oslm5a7bou84rqc;",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                    },
                })).data);
                const b = {
                    name: a("form#get_video").find('input[type="hidden"]').attr("name") || "",
                    value: a("form#get_video").find('input[type="hidden"]').attr("value") || "",
                };
                const d = new FormData();
                d.append("url", url);
                d.append(b.name, b.value);
                let s = yield axios.post("https://spotifymate.com/action", d, {
                    headers: Object.assign(Object.assign({ origin: "https://spotifymate.com/en" }, d.getHeaders()), { cookie: "session_data=o8079end5j9oslm5a7bou84rqc;", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36" }),
                });
                if (s.statusText !== "OK")
                    return reject("Fail Fetching");
                const c = cheerio.load(s.data);
                const e = {
                    title: c(".dlvideos").find('h3[itemprop="name"]').text().trim(),
                    author: c(".dlvideos")
                        .find(".spotifymate-downloader-middle > p > span")
                        .text()
                        .trim(),
                    thumbnail: c(".dlvideos").find("img").attr("src") || "",
                    cover: c(".dlvideos")
                        .find(".spotifymate-downloader-right")
                        .find("#none")
                        .eq(1)
                        .find("a")
                        .attr("href") ||
                        c(".dlvideos")
                            .find(".spotifymate-downloader-right")
                            .find("#pop")
                            .eq(1)
                            .find("a")
                            .attr("href") ||
                        "",
                    music: c(".dlvideos")
                        .find(".spotifymate-downloader-right")
                        .find("#none")
                        .eq(0)
                        .find("a")
                        .attr("href") ||
                        c(".dlvideos")
                            .find(".spotifymate-downloader-right")
                            .find("#pop")
                            .eq(0)
                            .find("a")
                            .attr("href") ||
                        "",
                    link: url,
                };
                resolve(e);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
