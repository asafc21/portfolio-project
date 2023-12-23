import Action from "./classes/action.js";
import ActionsManager from "./classes/actionsManager.js";

window.addActionToManager = function () {
  let action = new Action(
    document.getElementById("type").value,
    document.getElementById("description").value,
    +document.getElementById("amount").value
  );
  manager.addAction(action);
  showActionsInTable();
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
};

window.deleteActionFromManager = function (actionId) {
  if (confirm("Are you sure?")) {
    manager.deleteAction(actionId);
    showActionsInTable();
  }
};

window.updateActionFromManager = function (actionId) {
  let newAmount = prompt("what is the new amount?");
  if (newAmount == null || newAmount == "" || isNaN(newAmount)) {
    alert("Something went wrong");
  } else {
    manager.updateAction(actionId, +newAmount);
    showActionsInTable();
  }
};

function showActionsInTable() {
  document.getElementById("actions").innerHTML = "";
  localStorage.setItem("actions", JSON.stringify(manager.actions));
  for (let action of manager.actions) {
    document.getElementById("actions").innerHTML += `<tr class=${
      action.type == "income" ? "text-success" : "text-danger"
    }><td>${action.description}</td><td>${
      action.amount
    }</td><td><a onclick="updateActionFromManager(${
      action.id
    })"> <i class="fa-regular fa-pen-to-square"></i></a> </td><td> <a onclick="deleteActionFromManager(${
      action.id
    })"><i class="fa-solid fa-trash"></i> </a></td></tr>`;
  }
}
let manager = new ActionsManager();
showActionsInTable();
