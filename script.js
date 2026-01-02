fetch("attendance.csv")
    .then(response => {
        if (!response.ok) {
            throw new Error("CSV file not found");
        }
        return response.text();
    })
    .then(data => {
        const rows = data.trim().split("\n").slice(1); // FIX
        const tbody = document.querySelector("#attendanceTable tbody");

        let defaulters = 0;

        rows.forEach(row => {
            if (!row) return; // skip empty line

            const cols = row.split(",");
            const roll = cols[0];
            const name = cols[1];
            const total = Number(cols[2]);
            const present = Number(cols[3]);

            const percentage = ((present / total) * 100).toFixed(2);
            const status = percentage < 75 ? "Defaulter" : "Regular";

            if (percentage < 75) defaulters++;

            const tr = document.createElement("tr");
            if (percentage < 75) tr.classList.add("defaulter");

            tr.innerHTML = `
                <td>${roll}</td>
                <td>${name}</td>
                <td>${total}</td>
                <td>${present}</td>
                <td>${percentage}%</td>
                <td>${status}</td>
            `;

            tbody.appendChild(tr);
        });

        document.getElementById("summary").innerText =
            `Total Students: ${rows.length} | Defaulters: ${defaulters}`;
    })
    .catch(error => {
        console.error(error);
        alert("Error loading attendance.csv. Use Live Server.");
    });
