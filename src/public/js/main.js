const select = (selector) => {
  return document.querySelector(selector);
};
const selectAll = (selector) => {
  return document.querySelectorAll(selector);
};

let buttonNew = select("#button-new");

if (buttonNew) {
  buttonNew.onclick = () => {
    let newData = select("#new");
    if (newData) {
      newData.style.display = "flex";
    }
  };
}

let close = select("#close");
if (close) {
  close.onclick = () => (select("#new").style.display = "none");
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

var button = select("#add-button");
if (button) {
  button.onclick = () => {
    let validated = false;
    selectAll("#new input").forEach((input) => {
      if (!input.value) {
        input.classList.add("error");
        validated = false;
      } else {
        if (input.classList.contains("error")) {
          input.classList.remove("error");
        }
        validated = true;
      }
    });

    if (validated) {
      let product = select("#inp-product").value;
      let price = select("#inp-price").value;
      let quantity = select("#inp-quantity").value;
      let amount = select("#inp-amount").value;

      var item = {
        product: product,
        price: price,
        quantity: quantity,
        amount: amount,
      };

      axios.post("/new", item).then((response) => {
        if (response) {
          appendList(item);
        }
      });
    }
  };
}

async function remove(element, id) {
  await axios
    .delete(`http://localhost:3333/delete`, { data: { id: id } })
    .then(() => {
      element.parentNode.parentNode.remove();
    });
}

axios
  .get("http://localhost:3333/index")
  .then((response) => {
    response.data.forEach((item) => {
      appendList(item);
    });
  }) //caso retorne um sucesso
  .catch((error) => console.log(error)); //caso ocorra algum erro

function appendList(item) {
  let tr = document.createElement("tr");
  let html = `<tr>
              <td>${item.product}</td>
              <td>${formatter.format(item.price)}</td>
              <td>${item.quantity}</td>
              <td>${formatter.format(item.amount)}</td>
              <td><img src="assets/trash.svg" onclick="remove(this, '${
                item.id
              }')"></td>
          </tr>
          `;
  tr.innerHTML = html;
  select("#index-body").appendChild(tr);
}
