import { Platform } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { BASE_URL, PROD_BASE_URL } from "../API/ApiConstants";
import theme from "../themeConfig";

const RNFetchBlob = require("rn-fetch-blob").default;

export const ACCOUNT_TYPE = {
  PERSONAL: "personal",
  EXISTING: "existing",
};

export const INPUT_TYPE = {
  INPUTBOX: 0,
  DROPDOWN: 1,
  ARRAY: 2,
};
export const DATE_FORMAT = "YYYY-MM-DD";
export const SECERT_KEY = "(*Hnjkn2kjn";

export const WEBCLIENT_ID =
  "638155044511-6jaevsij1eisl66jeubv7qb7166ejlbs.apps.googleusercontent.com";
export const GOOGLE_API_KEY = "AIzaSyBGKi6f1zYwwra1LVNtthEp6VPzUkvcPkk";
const salt = "AE0DB48EBF4DDE3E59ABF92F1953F02A390B584CF65EE981E4598561D69F09D5";

const LOG_ENABLED = false;
export const DEBUG_BUILD = true;
export const STAGE_CHAT_URL =
  "https://st-td123.comquest-brunei.com:13443/chatbot/";
export const PROD_CHAT_URL = "https://123.comquest-brunei.com/chatbot/";

export const STAGE_FAQ = BASE_URL + "FAQ.html";
export const PROD_FAQ = PROD_BASE_URL + "FAQ.html";

export const STAGE_TERMS =
  "https://bcae-test.comquest-brunei.com:1443/terms.html";
export const PROD_TERMS = PROD_BASE_URL + "terms.html";

export const STAGE_PRIVACY =
  "https://bcae-test.comquest-brunei.com:1443/privacy.html";
export const PROD_PRIVACY = PROD_BASE_URL + "privacy.html";

export const ISIPAD = Platform.isPad;

export const DEFAULT_PROFILE_IMAGE =
  "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQERUSEhMVFRUVFRUZFxgXFRUWFxkYFRcXFhUWFRUYHSggGRolGxYVIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyYyMjIrLS8rMi0vLTUuLS0tLS8tLSsvLS0tLTAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgECAwUHBAj/xABKEAABAwICBgcEBwYDBgcBAAABAAIDBBEFIQYSMUFRYQcTInGBkaEyUrHBFCNCYoKS0TNDcqKy8CRj4TVTc3SD8RY0RKOzwtIV/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAIxEBAQACAgEEAwEBAAAAAAAAAAECERIhAwQxUWETMkEiYv/aAAwDAQACEQMRAD8A7iiIgIiICIiAsM9UyMtD3taXu1WBxA1nWJ1W32mwJtyWGlxSKWWSFrwZYSBIy9nt1gHNcW7dUg5HYfBQPpTfFiGH1bIu2+hmYXi17FrQ5+r3Me6/8LuCDpCL5WoNLq+nAbFWTtA3FwePKQFe6XpDxd4sa5/4YoGnzbGCq8otxr6Ymlaxpc5wa0ZkkgADiSdihGkHSxhtJdolNQ8fYgAfnzeSGjzXAsSqKmrN6maabO/1jzqg55huwbSsUdGG7SB3ZpyOLouMdNlXJlS00cQ96UmR1uTW2APmozU6cYvOc6yRt90bWMHoFpWljdgufNHSuPL++AUcqnUbJuOYje5xCoB/4p+C2dBp1i0Bu2sEoH2ZWNeD4gB3qoxqu4+iah970UbqdR1/R3pnYS2PEIDCSbdbHd8Q5vae00ea6nQ1sc8bZYntkY4Xa5pDmkciF8oCR2wjWC3Oiek0+GSdZTOvGTeSBx7D/wD8O+8PG6tMlbi+nUUSZp/SupoaprrMkdI14cQHRGKCSd7Hj3gI7c9YHYVsdHMVMo1HnWntrzBouyEv7TYXO2B7Wlo1duVyM87Kt4iIgIiICIiAiIgIiICIiAiIgIiIORdOGFSQvgxOnc6NzPqZHsJa4Am8TtYbta7fxBcxwfSeqpXPcx4f1kjZJBINbWI1w4Eg7HtkeHZbxwX0B0q/7IrMr/Un4jNfMkTiOydo9RuKrktGWV4LnFrQxpc4taDrBrSbtaDYXsMr8lc2YhXMa13I/wB7Fd9HHFUXW/SOSr1w4K4QDn6K4RN4HzQWdeOCCa+wErL2R9lvjn8Vd1nMDuy+CCwX4W7z8lVVuPeHqqF7feQVVLbwgkG4eaqgslfJYCOQsGu1xtsuAW61uIBPeMl37o1xaidGIKerMjwCXRyMZE8uJu+RrNUOdcm5Jc7bmSc1wNA8tIcHOa4G7XtJa5rtxa4ZtPMK0ulbNvrZFzjov6Qvpv8AhKsgVTQS11rCZg2uA2B43t37Rvt0dXUEREBERAREQEREBERAREQEREEA6ZMfjp6F1MRrSVYdG1vuty15D3XAHMjmuBVFPrAWyc3YfkeSkvSDjBrMUqH3uyI9VGNwbF2T5yF58uCj91S3teTp4WPvyI2jgvQyfccx6qtRTh2YycNh+R4heYOIOq4WPoeYKhL3AXzaf75hUueF+5eUGyzNqDvF/QqEr+sG+48FXsHePJUEzTxHh+irdp3tQV1GcR5Kuswb/IK3Vbxb5hVu0bx4f9kFet4N8SmZ2/6Kx07d1z6LE6cnl/fFBme8BXgXy4/2Fry/MCxzFwbGxHEHeOYXuOTvBBYyV7C2SNxZJG4Oa8ZFrhsIX0n0d6VDFKNsxsJWHUmaNzxvH3XCzh3r5veO13hS7odxg0mKCImzKppjI++y7oj/AFD8StjVco+iURFdQREQEREBERAREQEREBYqqUMY55yDWuJ8BdZVrdJTajqTwp5v/jcg+VaOQua6R21x1iebiXO9Ve3ZzKw0X7Efh+CzO9q3Aep2rJorfaTsC6b0f6JRSUbpKqJr/pFi1rgezG32CDtDibuuLG2qoJo7hH02ripvse1LyY3N3nk38S74xoAAAsAAABsAGwBZ+TLXTbxY77qFu6MKHWuOuA93rSR5ntDzWDFei6le3/DufC4Da5zpWu5uDnXHgQp4qhU5Vrwx+HFarozr2HsiGQcWyFp/K8D4rySaAYiP/T37pIz813cBVAVvyVT8WLhEegGIn9xbvkjHzWRnR1iJNuqjHN0rbel13QhWkJ+Sn4o49RdFVU4/Wzwxj7ofI7/6hbr/AMD09Jbq4X1lSfY6wkQsO58ob2Q0X2G5NshlcdFVFXnVp48Y4Zpzo5JSuZNNI6SSZ0gJIAb2A22q0ey0nW1W7mgc1o3HstPL4ZFdi6TsINTQucwa0kBEjRvIGUgHPULiOYXGqSS4t4j5ha43cY+THVZXbldQymOsp3jaypp3DvD2FWxDd/dlfgsJnraZg2yVUA42Bkbc+Az8FeM6+s0RFozEREBERAREQEREBERAXixuAyU0zBtfDI0fiYR817VQi6D5Bww3jA/hWVju048yfIlejEaE0tXPTkW6qaRoHIOJZ/KQvFI6xd3n4rOtI6Z0NUHZqKkjNz2xtPJg1nW/E70XSlEuiym1MMhP+8Mj/wAzz8gFLVz53t14TWMFUKiqFVdeFkaFiCvBUqrnBYyriVYSgtKoqlUULC4Vp9o/9Aq/qxaGa74uDXX7cY4W2gcDyXdVEulDDBPh8jrduC0rTv7PtjxaXeithdVn5MdxyBpvmN4PnY/NSroaw8TYrG42tDHJKM872EbbDf7ZUOo3/IqU9Es+pjFPa/bEzPAsLs/yBdE93LfZ9JoiLRmIiICIiAiIgIiICIiAiIg4X05YF1NXHWtHZqAGP4dZG2zfExj/ANtcxndbWPeV1vplxN1TTNtYRx1DHAWzILZIg8u5l2Q5rkhsduw/9llMpl3GtxuHVdxpcViwzDqYTHtNp4gGMsXPdqNvqg23nabBQzFukqqcfqWwwt+99Y/zvqjyK1Oh+jMmJTOu4tYzV6yQ9p1s9Vrb7TkeQHkugYRSUUL3R0NE6ocwlr5rsLdcbW9dKcyODBYclExkvzV+eVnxEBGmmJONxUE/wxsI9GL0R9IeIxmzpIXcnxAH+UtU/wAW0hqaZwaaaK5z1RP2gDsLrRWHmslJpI6Qf4igl1CLlwY2YWP2i0DWLeYaVe43W7h0ry+MkRpelOZtutpmOG8sc5vxuF0XAMYZWU7J2BzQ++TrXBaSHA2yOYOa02JaD0FazrIWiJ7gbSRGzSfvR31T5A9y5xWYpiVE80LZ5B1J1GtijYSW2u0tswuILSDxCzuGOX6rzPLH9nYsbxRtJBJO8OLYxchttY3IAAvltI2rntT0rPP7KlAHGST5NFvVR2mxnEql4ozPLeY6hZKxjTY7b60esBYHyU9oNCqGiZ1k4EzgBd8pOpfcGR3te+za5OOOP7J55Z/r0hc3SNiDzZroW8mRazv5i74Lyv01xIZmocO+JgHqxdEqtJeoaOqontafYLgyAHiQw9u3MtG1e3BMfqqj2qVgbnYmU522gExWJ8VpMbrfHpncv+kCwnpFrAfrTTyt4G8bz3OaC3zAU+w7GoMRgkYw6rixzXMJaXDWBFxYkObwIVmLYXRVDgyso+pc82bKNVo1tthNGRY8nbVzXTPRaTC5mua8uieT1b9jgRtY632rbxtHcqXCX6q08mU+4h9A7sg/dU46GKUyYtG7dHFK88rgMH9ShTiL5W8OO9dQ6HB9E1qpwuJ7M2G7Yo3Wc9p/jJuN4aFNymPdUxxuXUdxRAi1ZCIiAiIgIiICIiAiIgLFVE6jrbdV1vIrKqEXQjlWN4X9JoaiNoBeYoyy/vRRtkb/ADZeK5Fo1S9fV08dr68gyPBoLyD4NK7jMwxxSje1rmdxadUn8uoojheiv0XFo5Wi8To3yD7slg17Rwv1lx48FxePLU09Dy4crMo2XQ9ABRzHaXznWHcxjc/BTzBYIKcuaNVnWSOeAbAXIaCG7t17cyoN0cDqJ6+kO1lQZGj7j8m27mhn5lOHsDhYgEcCAR5Fa8tZbYcOWGkL08w95mmIfqvkc0sOdizVaDZ2y4sRbdlxWw0MrXF0cc8rHNijc0uOq1zi4gMac8zYei3kmHQu2xRmxuLsbt47FlipmN9lrW9wA+C6L6reOtM56fv3XdSxshLNjttthPHv5qB6M/X4xX1DfZjIiB4kEMdY/wDSPmpJpfjbaClfLlrkFsQ955GXgNp7lrNDMMNFRxh4tNPI18l7X1n2yNt4aLd91zZZdW1tjj/qSfxrNNrQYjQVR9nW6tx7zlc9z3eSnMVIwyh0n2fZvsB3nvtlfv4rRacYIa2jfG0fWNs+PcdZu4HdcEjxWXQjHRXUjXn9qzsSg5EOG8jmM/Mbkl6l+DKd2fLy6dRsfIXMlYLxarLEGzwXXBtsOYOe3NefQY1IMVOZA9rZBI42zY0ZuGtwJuPFS2WmY72mtd/EAfisUeGwtvqwxi+ZsxoueeS6Z6r/ADqxjfT99V7sSZDO5rey7q36xAsRfVcAHbvtXt3KD9MrQMPa4/YmYR+V4NvAqZsYGizQAOAAA8goX0pkTCjoxm6eoaSPuNBa644dv0WEy3lte4ccdOKT05ic9hGbXOFudyu50WH/AEejgiO2KFzCeN4i4n8w9FCYNGevxiqDwRHE50t8rEuAfE3zLj+DmuhQNMkUQ3vDWDvc7VB/LrFZeXLfTfwYcf8ASeUh+rZf3W/ALMqNFhbgqrscFEREBERAREQEREBERAREQRnSSj6t/XAXY+zZRwNtUOPIjI+C09azUEbhmGkC/wB13ZzPHZ5BTuWMPaWuFw4EEcQciFD3UthLTu2tu2/FrhdjvL1BXJ5sNXc/ru9P5NzV/iPY/gs4nZX0Rb17G6r43ZNlZssTxt8Bssr26cGMWqKGrjcNurGJGeDgdi3uGS6zBfbsPeMneoXruomfXacsO+kXPSRRgZtqb8Po8l/hZYndIXWZU1DVSu3XZqNvzOdgpdrHifNVup5T4RxvyhmE6PVFXUNrcS1bs/Y07c2M33dmRfIHabkAnYAJDXSXqYI+Bc8/lNvgVtAtFh7+trXu3NDgPCzf1VM8t6aePGTbfWUKxvRyop6k12HECR37WF2TJBtJAyFzllcZ5gi5vOCFjKtLpSyVDG9IJjyqqGqjdv1Wa7b8ibLNH0kUZ2sqQeH0eQ/03Cld1TWPE+anlPhHG/KMHTkPH+HoqyUnZeLq2+LnHLyWHBMHqJKl1fXaol1dSGJpu2Jhvv8AezOzieQEsuvNiM2owngMu/d62UXPrpMw3e3jpIg8yvOQcS2/3WjVyPH2luNG6PrH9cRZjLtjHE7C4cgBYeK8EdIS2KnG1xAJ4AZyO+PiQplFGGtDWiwAAA4AbFPhw3d1HqPJqan9XoiLrcIiIgIiICIiAiIgIiICIiAtbieEiZwe1xY8C1wAQRwcDtWyRRcZZqrY5XG7iGupDTzOjLtYO7YNgL62TshzHqvSthpNSFzBK0XdESbbyw5PHln+FayGQOAIXHnjxy07sM+eO16uCtVQoWXhaNuCvieXRu1mm92nJ1uR2H0W7BVbqLJSZWezy0dM9pu55tubw8V6il1QlTOkW7UKtVSqIC8ppTUTNiB1bdtxsDYN2ZHi4jyXokfqi5Ww0XpSGumcM5bavEMHs+eZ8VOOPLLSM8+GNr04ZhIicXueXvItewADdtmtGzNbJEXZMZJqOHLK5XdERFKoiIgIiICIiAiIgIiICIiAiIgEKI1tL9Fl1f3TySw+6dpj+YUuWCtpGzMMbxcHzB3EHcQs/Jhyn218Xk4X6R0IvPZ8L+ql27Wu3PbxHPiF6Fyu1jdGT9tw7tX9FikZq/vXDv1T8l6VRwvtUG3nYC796SeQaPksrYyNr3H8v6K9rQNiqhsRF5360rxFF7R2nc1u9x/TegupqY1UvV/u22Mh9QzvO/kpcBbILz4fRNgjDG7tpO1xO1x5leldfjw4z7cXl8nO9ewiItGQiIgIiICIiAiIgIiICIiAiIgIiIC8eMYnHSQPnlNmRtuePAADeSbADiV7Fynp0xoCOGiae089bIPuMJEd+99yP+GUERx3pPq6qeMWjii61lmBoc4AuDc5DnrWJ2WHeuj4biWtZj8nbuB7v0Xz5U5Oa7cHNJ/CQSu6RwhzGnIhzWkEG4NwCCCPiuT1HVljt9Lq42VI0WkhqJY8gQ8cHZHz3rOMUdviPg5qy5RvcK2iLVnFHboj4uasE1TK/K4YOWZ8zsTlDhXpxHEQ3sszd6Dmf0XNsP6S6ujqpBaOSLrDrMLQHENJHZkGYdlle43ZKdtp8jYbiSfDMklcLd2ppHXuOseb8e0bLX0/eVtY+p6xkj6zwuvZUwxzxm7JWNe07DqvAcLjcc9i9SgXQxiomw4Q37dO9zCN4aTrxnu1Ta/Fp4KerrcIiIgIiICIiAiIgIiICIiAiIgIite8NFyQBxOSC5FqK7Siig/a1cDP4pWD0utBVdKmGMybM+U/5cMpHg8tDT5oJDpHpBBQQmWd4aNjWjN73bmsbtJ+G02C+b9IcYkrqmSpl9qQ5AZhjBkyMHeAN+8knevVpnj3/wDQrZpxr6l2tjD9rIwxuQAJAu/XOW3wWkQWubcWK22j2lVRQDUFpYP9042A49W6xLD5jktWiiyXqpxyuN3HYdHdIaeuFoX2kAuYn2Eg7hscObbrdGnPArgGqWEPjcWOabhzTqkHi07iu3aBY+a6ka95BlYdSS29wAIdb7wIPiVy+Txce47fF57l1WxFOeBWq0gxunoGg1EgBPssb2pHdzRu5nJerTPSEYfSumsHPJDI2nYXu2X5AAk9y4bJI+aR00zzJI43c4m/gOAHDcnj8XLunl83HqN5pFphUVwMbR9HpztYDd7x/mPyy+6Mu9aNjQBYK5F1TGTqOPLK5XdbnRLSOXDqls8faHsyR3sJGe7fc4HMHjlsJX0ZgGNw10LZ6d4c05EbHNdvY9u1rhfYV8tLd6JaWTYZUCSJvWNkDmyRF5Y11gC15NjZw2A22GylV9NouaUHTJSut19PUQnk1srfNhv6KSYZ0gYbUECOrjDjsbJrRO8GyhpPggk6KyKVrxdrg4HeCCPMK9AREQEREBERAREQFD9MekOlw49VnPUW/ZR2uOcjzkwd+fJajpX05dRhtHSkCplaS5+R6mPZrW9856vcTwXE76twCSSSXOJu5zjtc4naTxQS7GekjEqgn65tM03syBt3W3Xlfck8wAolVTvlN5ZJZTxllkkP8xWNEFrIw32WgdwA+CuREFjsjfz7v9P1V6KxmXZ8R3bx4fDuQXq17gASdgVywuGs625uZ5naB8/JBjEbn9p2XAcB+qnPQ3VGKrmpycpIw9o5xnO3g9RBbvQafq8SpnXsC57D3PjeAD+LVVM5vGr+O6yjZdMlYZauGmHsxRa7v4pCRn3NaPzKDmAt7Tc7bRxHBSPTWbrMRqncHhg7mMaPjdadMJrGHku8qtY4EXGwq5YgNV3J3od/n+qyq6gsbDrHW3Ws3u4+P6Kkg1jq7vtfJvzP+qyoAKu6w7Dn35q1EHqoK58Dg6GSSEjfE9zPNrTYjkQVNsD6VK6AgTBlVGNtwI5u8Pb2T3Fo7wufoCg+ldEtMqXE2kwPIe324njVkZ3t3jP2hcKQr5Ohme2RssTzFNGbxyNyIPA8Rns5rvvRnpuMUhc2UBlVDYSsGw8JWD3T6HwuE0REQEREBYK6qbDE+V5syNjnuPBrAXOPkCs6hvS9WmLCagDbKGRD/quDD6EoOBVmIPqppquS+vUSF2e0M2Mb4NAHgsCqRbIbBkPBUQEREBERAVkjbjLaMx3q9EFmvcC2/wBO/uVzW2FkAsqoC9mCy6tTTn/PhH5pGt+a8arE7Vex3uyRO/LI0/JRfZM93oxaTWqah3Gom9JHNHwXmV9S68sp4zTHzkeVYk9i+617bi3996tD8jfaPXgQsioRdShRrbD49+8q5EQEREBERAWwwDG3UFXFWM/dkNmHvwuNnjw294C16AA5HYRY9xQfWcMoe0OabtcAQRvBFwVeoV0PYk6fCoQ83fCXwuPKNxDP5NRTVAREQFzvpz/2cz/moPiVREHDkREBERAREQEREBERAVkuzxHxCIguG138b/6yqoiFEREBERAREQEREBERB2zoL/8AJ1H/ADT/AOhi6UiICIiD/9k=";

export const spacing = {
  WIDTH_1: wp("0.25%"),
  HEIGHT_1: hp("0.125%"),

  WIDTH_2: wp("0.5%"),
  HEIGHT_2: hp("0.25%"),

  WIDTH_3: wp("0.75%"),
  HEIGHT_3: hp("0.37%"),

  WIDTH_4: wp("1%"),
  HEIGHT_4: hp("0.5%"),

  WIDTH_5: wp("1.25%"),
  HEIGHT_5: hp("0.63%"),

  WIDTH_6: wp("1.5%"),
  HEIGHT_6: hp("0.75%"),

  WIDTH_7: wp("1.75%"),
  HEIGHT_7: hp("0.88%"),

  WIDTH_8: wp("2%"),
  HEIGHT_8: hp("1%"),

  WIDTH_9: wp("2.25%"),
  HEIGHT_9: hp("1.12%"),

  WIDTH_10: wp("2.5%"),
  HEIGHT_10: hp("1.25%"),

  WIDTH_11: wp("2.75%"),
  HEIGHT_11: hp("1.37%"),

  WIDTH_12: wp("3%"),
  HEIGHT_12: hp("1.5%"),

  WIDTH_13: wp("3.25%"),
  HEIGHT_13: hp("1.63%"),

  WIDTH_14: wp("3.5%"),
  HEIGHT_14: hp("1.75%"),

  WIDTH_15: wp("3.75%"),
  HEIGHT_15: hp("1.88%"),

  WIDTH_16: wp("4%"),
  HEIGHT_16: hp("2%"),

  WIDTH_17: wp("4.25%"),
  HEIGHT_17: hp("2.4%"),

  WIDTH_18: wp("4.5%"),
  HEIGHT_18: hp("2.25%"),

  WIDTH_19: wp("4.75%"),
  HEIGHT_19: hp("2.375%"),

  WIDTH_20: wp("5%"),
  HEIGHT_20: hp("2.5%"),

  WIDTH_21: wp("5.25%"),
  HEIGHT_21: hp("2.625%"),

  WIDTH_22: wp("5.5%"),
  HEIGHT_22: hp("2.75%"),

  WIDTH_23: wp("5.75%"),
  HEIGHT_23: hp("2.88%"),

  WIDTH_24: wp("6%"),
  HEIGHT_24: hp("3%"),

  WIDTH_25: wp("6.25%"),
  HEIGHT_25: hp("3.12%"),

  WIDTH_26: wp("6.5%"),
  HEIGHT_26: hp("3.25%"),

  WIDTH_27: wp("6.75%"),
  HEIGHT_27: hp("3.375%"),

  WIDTH_28: wp("7%"),
  HEIGHT_28: hp("3.5%"),

  WIDTH_29: wp("7.25%"),
  HEIGHT_29: hp("3.625%"),

  WIDTH_30: wp("7.5%"),
  HEIGHT_30: hp("3.75%"),

  WIDTH_31: wp("7.75%"),
  HEIGHT_31: hp("3.87%"),

  WIDTH_32: wp("8%"),
  HEIGHT_32: hp("4%"),

  WIDTH_33: wp("8.25%"),
  HEIGHT_33: hp("4.12%"),

  WIDTH_34: wp("8.5%"),
  HEIGHT_34: hp("4.25%"),

  WIDTH_35: wp("8.75%"),
  HEIGHT_35: hp("4.37%"),

  WIDTH_36: wp("9%"),
  HEIGHT_36: hp("4.5%"),

  WIDTH_37: wp("9.25%"),
  HEIGHT_37: hp("4.625%"),

  WIDTH_38: wp("9.5%"),
  HEIGHT_38: hp("4.75%"),

  WIDTH_39: wp("9.75%"),
  HEIGHT_39: hp("4.87%"),

  WIDTH_40: wp("10%"),
  HEIGHT_40: hp("5%"),

  WIDTH_41: wp("10.25%"),
  HEIGHT_41: hp("5.12%"),

  WIDTH_42: wp("10.5%"),
  HEIGHT_42: hp("5.25%"),

  WIDTH_43: wp("10.75%"),
  HEIGHT_43: hp("5.37%"),

  WIDTH_44: wp("11%"),
  HEIGHT_44: hp("5.5%"),

  WIDTH_45: wp("11.25"),
  HEIGHT_45: hp("5.625"),

  WIDTH_46: wp("11.5"),
  HEIGHT_46: hp("5.75"),

  WIDTH_47: wp("11.75"),
  HEIGHT_47: hp("5.87"),

  WIDTH_48: wp("12"),
  HEIGHT_48: hp("6"),

  WIDTH_49: wp("12.25"),
  HEIGHT_49: hp("6.125"),

  WIDTH_50: wp("12.5%"),
  HEIGHT_50: hp("6.25%"),
};

export const SUPPORT_NUM = "+1 5550393936"
export const bottomBarHeight = 50;

export const fontSizes = {
  FONT_6: ISIPAD ? wp("1%") : wp("1.5%"),
  FONT_8: ISIPAD ? wp("1.5%") : wp("2%"),
  FONT_10: ISIPAD ? wp("2%") : wp("2.5%"),
  FONT_11: ISIPAD ? wp("2.25%") : wp("2.75%"),
  FONT_12: ISIPAD ? wp("2.5%") : wp("3%"),
  FONT_13: ISIPAD ? wp("2.75%") : wp("3.25%"),
  FONT_14: ISIPAD ? wp("3%") : wp("3.5%"),
  FONT_15: ISIPAD ? wp("3.25%") : wp("3.75"),
  FONT_16: ISIPAD ? wp("3.5%") : wp("4%"),
  FONT_17: ISIPAD ? wp("3.75%") : wp("4.25%"),
  FONT_18: ISIPAD ? wp("4%") : wp("4.5%"),
  FONT_19: ISIPAD ? wp("4.25%") : wp("4.75%"),
  FONT_20: ISIPAD ? wp("4.5%") : wp("5%"),
  FONT_22: ISIPAD ? wp("5%") : wp("5.5%"),
  FONT_24: ISIPAD ? wp("5.5%") : wp("6%"),
  FONT_26: ISIPAD ? wp("6%") : wp("6.5%"),
  FONT_28: ISIPAD ? wp("6.5%") : wp("7%"),
  FONT_30: ISIPAD ? wp("7%") : wp("7.5%"),
  FONT_32: ISIPAD ? wp("7.5%") : wp("8%"),
  FONT_34: ISIPAD ? wp("8%") : wp("8.5%"),
  FONT_36: ISIPAD ? wp("8.5%") : wp("9%"),
  FONT_38: ISIPAD ? wp("9%") : wp("9.5%"),
  FONT_40: ISIPAD ? wp("9.5%") : wp("10%"),
};

export const color = {
  BCAE_PRIMARY: theme.colors.primary,
  BCAE_LIGHT_BLUE: "#365B9E",
  BCAE_LIGHT_BLUE_2: "#FFF7F7",
  BCAE_LIGHT_BLUE_3: "#4F86EC",
  BCAE_DARK_BLUE: "#292D32",
  BCAE_OFF_WHITE: "#F5F5F5",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  TRANSPARENT: "transparent",
  PLACEHOLDER: "#9E9E9E",
  DISABLED_GREY: "#DCDCDC",
  DARK_GREY: "#6C6C6C",
  INPUT_TEXT_BORDER: "#CECECE",
  ERROR_TEXT_RED: "#D64538",
  TOAST_RED: "#FF0000",
  PROFILE_NAME: "#292D32",
  CLICK_BACK_TEXT: "#090A0A",
  VERSION_BACKGROUND: "#FAD706",
  APPOINTMENT_BACKGROUND: "#D7E5FF",
};

export const buttonType = {
  PRIMARY: 1,
  SECONDARY: 2,
};

export const buttonSize = {
  LARGE: 1,
  FLEXI: 2,
  FIXED: 3,
  SMALL: 4,
  MEDIUM: 5,
};

export const constVariables = {
  HELPDESK: "HELPDESK",
  INTERACTION: "INTERACTION",
  OPERATIONAL: "OPERATIONAL",
  APPOINTMENT: "APPOINTMENT",
}

export const storageKeys = {
  LAST_LOGINT_TIMESTAMP: "LAST_LOGINT_TIMESTAMP",
  VERSION_CODE: "VERSION_CODE",
  DASHBOARD_DATA: "DASHBOARD_DATA",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  LANGUAGE_KEY: "LANGUAGE_KEY",
  SAVED_LOCATION: "SAVED_LOCATION",
  PROFILE_DETAILS: "PROFILE_DETAILS",
  FCM_DEVICE_ID: "FCM_DEVICE_ID",
  PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
  GEOCODER_DATA: "GEOCODER_DATA",
  LOGIN_ID: "LOGIN_ID",
  TOKEN_EXPIRY: "TOKEN_EXPIRY",
  USERTYPE: "USERTYPE",
  CUSTOMER_ID: "CUSTOMER_ID",
  CUSTOMER_UUID: "CUSTOMER_UUID",
  CURRENT_DASHBOARD: "CURRENT_DASHBOARD",
  CHANGE_DASHBOARD: "CHANGE_DASHBOARD",
  CURRENT_ROLE_DESC: "CURRENT_ROLE_DESC",
  CURRENT_ROLE_ID: "CURRENT_ROLE_ID",
  CURRENT_DEPT_DESC: "CURRENT_DEPT_DESC",
  CURRENT_DEPT_ID: "CURRENT_DEPT_ID",
  CURRENT_USER_ID: "CURRENT_USER_ID",

  DASHBOARD: "Dashboard",
  INTERACTION_DASHBOARD: "Interaction Dashboard",
  APPOINTMENT_DASHBOARD: "Appointment Dashboard",
  HELPDESK_DASHBOARD: "Helpdesk Dashboard",
  OPERATIONAL_DASHBOARD: "Operational Dashboard"
};

export function validateEmail(text) {
  let reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(text) === false) {
    //console.log("Email is Not Correct");
    return false;
  } else {
    //console.log("Email is Correct");
    return true;
  }
}

export function validatePassword(text) {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

  let reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
  if (reg.test(text) === false) {
    //console.log("Password is Not Correct");
    return false;
  } else {
    //console.log("Password is Correct");
    return true;
  }
}

export async function passwordHash(password) {
  console.log("passwordHash===>" + password);

  const encodedPassword = await RNFetchBlob.base64.encode(password);
  console.log(encodedPassword);
  let val = [encodedPassword, salt].join("$");

  console.log("val===>" + val);
  return val;
}

export function validateNumber(text) {
  if (text.length > 6) {
    return true;
  } else {
    return false;
  }
}

export function isValidNumber(text) {
  if (text?.charAt(0) == "0") {
    return false;
  } else {
    return true;
  }
}

export function TDLog(fileName, text) {
  if (LOG_ENABLED) {
    console.debug(
      "\n===TDLog==TD123=======>" + fileName + "===========> :" + text
    );
  }
}

export const mockFaq = [
  {
    id: 1,
    title: "TNEB TANGEDCO AAO Job Recruitment 2023",
    desc: "TNEB Recruitment 2023 Notification For Various Vacancies",
    date: "Today, 03:44 PM",
  },
  {
    id: 2,
    title: "TNEB TANGEDCO AAO Job Recruitment 2022",
    desc: "TNEB Recruitment 2022 Notification For Various Vacancies",
    date: "Today, 12:10 PM",
  },
  {
    id: 3,
    title: "TNEB TANGEDCO AAO Job Recruitment 2021",
    desc: "TNEB Recruitment 2021 Notification For Various Vacancies",
    date: "Today, 11:10 AM",
  },
  {
    id: 4,
    title: "TNEB TANGEDCO AAO Job Recruitment 2020",
    desc: "TNEB Recruitment 2020 Notification For Various Vacancies",
    date: "Today, 09:10 PM",
  },
  {
    id: 5,
    title: "TNEB TANGEDCO AAO Job Recruitment 2019",
    desc: "TNEB Recruitment 2019 Notification For Various Vacancies",
    date: "Today, 01:10 PM",
  },
  {
    id: 6,
    title: "TNEB TANGEDCO AAO Job Recruitment 2018",
    desc: "TNEB Recruitment 2018 Notification For Various Vacancies",
    date: "Today, 06:10 PM",
  },
  {
    id: 7,
    title: "TNEB TANGEDCO AAO Job Recruitment 2017",
    desc: "TNEB Recruitment 2017 Notification For Various Vacancies",
    date: "Today, 01:10 PM",
  },
  {
    id: 8,
    title: "TNEB TANGEDCO AAO Job Recruitment 2016",
    desc: "TNEB Recruitment 2016 Notification For Various Vacancies",
    date: "Today, 06:10 PM",
  },
];
export const mockAnnouncementList = [
  {
    id: 1,
    title: "TNEB TANGEDCO AAO Job Recruitment 2023",
    desc: "TNEB Recruitment 2023 Notification For Various Vacancies",
    date: "Today, 03:44 PM",
  },
  {
    id: 2,
    title: "TNEB TANGEDCO AAO Job Recruitment 2022",
    desc: "TNEB Recruitment 2022 Notification For Various Vacancies",
    date: "Today, 12:10 PM",
  },
  {
    id: 3,
    title: "TNEB TANGEDCO AAO Job Recruitment 2021",
    desc: "TNEB Recruitment 2021 Notification For Various Vacancies",
    date: "Today, 11:10 AM",
  },
  {
    id: 4,
    title: "TNEB TANGEDCO AAO Job Recruitment 2020",
    desc: "TNEB Recruitment 2020 Notification For Various Vacancies",
    date: "Today, 09:10 PM",
  },
  {
    id: 5,
    title: "TNEB TANGEDCO AAO Job Recruitment 2019",
    desc: "TNEB Recruitment 2019 Notification For Various Vacancies",
    date: "Today, 01:10 PM",
  },
  {
    id: 6,
    title: "TNEB TANGEDCO AAO Job Recruitment 2018",
    desc: "TNEB Recruitment 2018 Notification For Various Vacancies",
    date: "Today, 06:10 PM",
  },
  {
    id: 7,
    title: "TNEB TANGEDCO AAO Job Recruitment 2017",
    desc: "TNEB Recruitment 2017 Notification For Various Vacancies",
    date: "Today, 01:10 PM",
  },
  {
    id: 8,
    title: "TNEB TANGEDCO AAO Job Recruitment 2016",
    desc: "TNEB Recruitment 2016 Notification For Various Vacancies",
    date: "Today, 06:10 PM",
  },
];

export const supportedCountriesList = [
  {
    countryName: "American Samoa",
    countryShortCode: "AS",
    numberLength: 10,
  },
  {
    countryName: "Antigua and Barbuda",
    countryShortCode: "AG",
    numberLength: 10,
  },
  {
    countryName: "Armenia",
    countryShortCode: "AM",
    numberLength: 8,
  },
  {
    countryName: "Aruba",
    countryShortCode: "AW",
    numberLength: 7,
  },
  {
    countryName: "Australia",
    countryShortCode: "AU",
    numberLength: 9,
  },
  {
    countryName: "Austria",
    countryShortCode: "AT",
    numberLength: 10,
  },
  {
    countryName: "Brunei",
    countryShortCode: "BN",
    numberLength: 7,
  },
  {
    countryName: "China",
    countryShortCode: "CN",
    numberLength: 13,
  },
  {
    countryName: "Czech Republic",
    countryShortCode: "CZ",
    numberLength: 9,
  },
  {
    countryName: "Guadeloupe",
    countryShortCode: "GP",
    numberLength: 9,
  },
  {
    countryName: "Singapore",
    countryShortCode: "SG",
    numberLength: 8,
  },
  {
    countryName: "India",
    countryShortCode: "IN",
    numberLength: 10,
  },
  {
    countryName: "Indonesia",
    countryShortCode: "ID",
    numberLength: 9,
  },
  {
    countryName: "Malaysia",
    countryShortCode: "MY",
    numberLength: 7,
  },
  {
    countryName: "Qatar",
    countryShortCode: "QA",
    numberLength: 8,
  },
  {
    countryName: "Taiwan",
    countryShortCode: "TW",
    numberLength: 9,
  },
  {
    countryName: "Thailand",
    countryShortCode: "TH",
    numberLength: 9,
  },
  {
    countryName: "United Arab Emirates (UAE)",
    countryShortCode: "AE",
    numberLength: 9,
  },
  {
    countryName: "United Kingdom",
    countryShortCode: "GB",
    numberLength: 10,
  },
  {
    countryName: "United States",
    countryShortCode: "US",
    numberLength: 10,
  },
];
