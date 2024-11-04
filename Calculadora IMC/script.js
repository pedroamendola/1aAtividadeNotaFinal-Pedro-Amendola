function calculateIMC() {
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;

    if (height && weight) {
        const heightInMeters = height / 100;
        const imc = weight / (heightInMeters * heightInMeters);
        alert("Seu IMC é: " + imc.toFixed(2));
    } else {
        alert("Preencha os campos");
    }
}