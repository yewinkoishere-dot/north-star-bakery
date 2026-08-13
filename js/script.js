// Bakery product information
const bakeryItems = {
    "Signature Loaf": {
        name: "Signature Loaf",
        price: "$6-$9"
    },

    "Butter Croissant": {
        name: "Butter Croissant",
        price: "$3-$5"
    },

    "Celebration Cake": {
        name: "Celebration Cake",
        price: "$30-$50"
    }
};

// Request type information
const requestTypes = {
    preorder: "Pre-Order",
    question: "General Question"
};


// Update the order summary
function updateOrderSummary() {
    const item = document.getElementById("item").value;

    const summaryMessage = document.getElementById("summaryMessage");
    const summaryItem = document.getElementById("summaryItem");
    const summaryPrice = document.getElementById("summaryPrice");

    if (item && bakeryItems[item]) {
        summaryMessage.textContent =
            "Here is your selected bakery item:";

        summaryItem.textContent =
            "Item: " + bakeryItems[item].name;

        summaryPrice.textContent =
            "Estimated price: " + bakeryItems[item].price;
    } else {
        summaryMessage.textContent =
            "Choose an item to see details.";

        summaryItem.textContent = "";
        summaryPrice.textContent = "";
    }
}


// Check the customer's name
function validateName() {
    const name = document.getElementById("name").value.trim();
    const error = document.getElementById("nameError");

    if (name === "") {
        error.textContent = "Please enter your full name.";
        return false;
    }

    error.textContent = "";
    return true;
}


// Check the customer's email
function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const error = document.getElementById("emailError");

    if (email === "") {
        error.textContent = "Please enter your email address.";
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        error.textContent =
            "Please enter a valid email address.";
        return false;
    }

    error.textContent = "";
    return true;
}


// Check the selected bakery item
function validateItem() {
    const item = document.getElementById("item").value;
    const error = document.getElementById("itemError");

    if (item === "") {
        error.textContent =
            "Please select a bakery item.";
        return false;
    }

    error.textContent = "";
    return true;
}


// Check the pickup date
function validateDate() {
    const date = document.getElementById("date").value;
    const error = document.getElementById("dateError");

    if (date === "") {
        error.textContent =
            "Please select a pickup date.";
        return false;
    }

    const selectedDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        error.textContent =
            "Pickup date cannot be in the past.";
        return false;
    }

    error.textContent = "";
    return true;
}


// Save customer information
function saveCustomerData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const item = document.getElementById("item").value;

    localStorage.setItem("bakeryName", name);
    localStorage.setItem("bakeryEmail", email);
    localStorage.setItem("bakeryItem", item);
}


// Load saved customer information
function loadCustomerData() {
    const savedName = localStorage.getItem("bakeryName");
    const savedEmail = localStorage.getItem("bakeryEmail");
    const savedItem = localStorage.getItem("bakeryItem");

    if (savedName) {
        document.getElementById("name").value = savedName;
    }

    if (savedEmail) {
        document.getElementById("email").value = savedEmail;
    }

    if (savedItem) {
        document.getElementById("item").value = savedItem;
        updateOrderSummary();
    }
}


// Listen for item selection
document.getElementById("item").addEventListener(
    "change",
    updateOrderSummary
);


// Listen for form submission
document.getElementById("bakeryForm").addEventListener(
    "submit",
    function(event) {

        const nameValid = validateName();
        const emailValid = validateEmail();
        const itemValid = validateItem();
        const dateValid = validateDate();

        if (!nameValid ||
            !emailValid ||
            !itemValid ||
            !dateValid) {

            event.preventDefault();

            document.getElementById("formMessage").textContent =
                "Please correct the errors above before submitting.";

            return;
        }

        saveCustomerData();

        event.preventDefault();

        document.getElementById("formMessage").textContent =
            "Thank you! Your request has been saved.";
    }
);


// Load saved information when the page opens
loadCustomerData();
