import App from "./App.vue";
import { meta as AppMeta } from "./App.vue?meta";

console.log("App.props:", App.props);
console.log("App.emits:", App.emits);
// console.log("App.expose:", App.expose);
// console.log("App.slots:", App.slots);
console.log("App keys:", Object.keys(App));

console.log("AppMeta:", AppMeta);
