function approveUser() {
  const email = document.getElementById("email").value;

  fetch("https://cuddly-space-carnival-jj5p4qj7x7v7357q7-3000.app.github.dev/approve-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert(data.message);
    })
    .catch(err => console.error(err));
}
