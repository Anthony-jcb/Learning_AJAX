(() => {
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      //console.log("Completado");
      let json = JSON.parse(xhr.responseText);
      //console.log(json);

      json.forEach((user) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${user.name} -- ${user.email} -- ${user.phone}`;
        $fragment.appendChild($li);
      });

      $xhr.appendChild($fragment);
    } else {
      //console.log("Error");
      let message = xhr.statusText || "Ocurrió un error";
      $xhr.innerHTML = `Error ${xhr.status} : ${message}`;
    }

    console.log("XHR: Mensaje que siempre aparecerá");
  });

  //xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  xhr.open("GET", "./users.json");
  xhr.send();
})();

(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((json) => {
      json.forEach((user) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${user.name} -- ${user.email} -- ${user.phone}`;
        $fragment.appendChild($li);
      });

      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      let message = err.statusText || "Ocurrió un error";
      $fetch.innerHTML = `Error ${err.status} : ${message}`;
    })
    .finally(() => {
      console.log("FETCH: Mensaje que siempre aparecerá");
    });
})();

(() => {
  const $async_fetch = document.getElementById("async_fetch"),
    $fragment = document.createDocumentFragment();

  async function dataGet() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      json.forEach((user) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${user.name} -- ${user.email} -- ${user.phone}`;
        $fragment.appendChild($li);
      });

      $async_fetch.appendChild($fragment);
    } catch (err) {
      let message = err.statusText || "Ocurrió un error";
      $async_fetch.innerHTML = `Error ${err.status} : ${message}`;
    } finally {
      console.log("ASYNC FETCH: Mensaje que siempre aparecerá");
    }
  }

  dataGet();
})();

(() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      const json = res.data;
      json.forEach((user) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${user.name} -- ${user.email} -- ${user.phone}`;
        $fragment.appendChild($li);
      });
      $axios.appendChild($fragment);
    })
    .catch((err) => {
      let message = err.response.statusText || "Ocurrió un error";
      $axios.innerHTML = `Error ${err.response.status} : ${message}`;
    })
    .finally(() => {
      console.log("AXIOS: Mensaje que siempre aparecerá");
    });
})();

(() => {
  const $async_axios = document.getElementById("async_axios"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const json = await res.data;
      json.forEach((user) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${user.name} -- ${user.email} -- ${user.phone}`;
        $fragment.appendChild($li);
      });
      $async_axios.appendChild($fragment);
    } catch (err) {
      let message = err.response.statusText || "Ocurrió un error";
      $async_axios.innerHTML = `Error ${err.response.status} : ${message}`;
    } finally {
      console.log("ASYNC AXIOS: Mensaje que siempre aparecerá");
    }
  }

  getData();
})();
