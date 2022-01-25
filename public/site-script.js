window.onload = () => {
  const exercise_form = document.getElementById("exercise_form");

  exercise_form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const id = document.getElementById("ID").value;

    exercise_form.setAttribute("action", `/api/users/${id}/exercises`);

    e.target.submit();
  });
};
