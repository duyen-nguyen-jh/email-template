let decisionTree = [
  {
    id: 0,
    content: `Sunday plan`,
    parentId: null,
  },
  {
    id: 1,
    content: `Shopping`,
    parentId: 0,
  },
  {
    id: 2,
    content: `Stay home`,
    parentId: 0,
  },
  {
    id: 3,
    content: `Hang out`,
    parentId: 0,
  },
  {
    id: 4,
    content: `Shopee`,
    parentId: 1,
  },
  {
    id: 5,
    content: `Go mall`,
    parentId: 1,
  },
  {
    id: 6,
    content: `Cooking`,
    parentId: 2,
  },
  {
    id: 7,
    content: `Netflix n Chill`,
    parentId: 2,
  },
  {
    id: 8,
    content: `Yoga`,
    parentId: 2,
  },
  {
    id: 9,
    content: `Go for milktea`,
    parentId: 3,
  },
  {
    id: 10,
    content: `Stalking someone`,
    parentId: 3,
  },
];

function getParentTitle(parentId) {
  const foundNode = decisionTree.find((node) => node.id === parentId);
  return foundNode ? foundNode.content : `Sunday plan`;
}

function getNodeByName(nodeName) {
  return decisionTree.find(
    (node) => node.content.toLowerCase() === nodeName.toLowerCase()
  );
}

function renderList(listDecision) {
  let title = document.getElementById("title");

  if (listDecision.length === 0 || !listDecision) {
    title.appendChild(document.createTextNode(decisionTree[0].content));
    return;
  }
  title.appendChild(document.createTextNode(getParentTitle(listDecision[0].parentId)));

  let listWrapper = document.getElementById("decisionList");
  listDecision.forEach((element) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(element.content));
    li.style.cursor = "pointer";

    let selectBtn = document.createElement("button");
    selectBtn.textContent = "Select";
    selectBtn.addEventListener("click", function (e) {
      onClickChild(element.id, element.content);
    });
    li.appendChild(selectBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      onDeleteItem(element.id, element.parentId);
    });
    li.appendChild(deleteBtn);

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      onEditItem(element.id, element.content, element.parentId);
    });
    li.appendChild(editBtn);

    listWrapper.appendChild(li);
  });
}

function clearOldList() {
  let listWrapper = document.getElementById("decisionList");
  while (listWrapper.childNodes[0]) {
    listWrapper.removeChild(listWrapper.childNodes[0]);
  }
  let title = document.getElementById("title");
  title.removeChild(title.childNodes[0]);
}

function onClickChild(id, content) {
  clearOldList();

  const listChildrenFromSelectedNode = decisionTree.filter(
    (node) => node.parentId === id
  );
  if (listChildrenFromSelectedNode.length === 0) {
    let title = document.getElementById("title");
    title.appendChild(document.createTextNode(content));
  } else {
    renderList(listChildrenFromSelectedNode);
  }
}

function addNewNode() {
  const newContent = document.getElementById("newContentInput").value;
  const parentContent = document.getElementById("parentContentInput").value;
  const parentNode = getNodeByName(parentContent);
  if (parentNode) {
    decisionTree.push({
      id: Date.now(),
      content: newContent,
      parentId: parentNode.id,
    });
    clearOldList();
    renderList(decisionTree.filter((node) => node.parentId === parentNode.id));
  } else {
    decisionTree.push({
      id: Date.now(),
      content: newContent,
      parentId: 0,
    });
    clearOldList();
    renderList(decisionTree.filter((node) => node.parentId === 0));
  }
}

function onClickBack() {
  const currentTitle = document.getElementById("title").textContent;
  const currentNode = getNodeByName(currentTitle);
  if (currentNode) {
    const backList = decisionTree.filter(
      (node) => node.parentId === currentNode.parentId
    );
    console.log({ currentNode, backList });
    clearOldList();
    renderList(backList);
  }
}

function onDeleteItem(deleteId, parentId) {
  const listAfterDeleted = decisionTree.filter((node) => node.id !== deleteId);
  decisionTree = [...listAfterDeleted];
  clearOldList();
  renderList(listAfterDeleted.filter((node) => node.parentId === parentId));
}

function onEditItem(editId, oldContent, parentId) {
  const editValFromPromp = prompt("Please enter new content", oldContent);
  const newTree = decisionTree.map((node) =>
    node.id === editId
      ? {
          ...node,
          content: editValFromPromp,
        }
      : node
  );
  decisionTree = [...newTree];
  clearOldList();
  renderList(newTree.filter((node) => node.parentId === parentId));
}
renderList(decisionTree.filter((node) => node.parentId === 0));
