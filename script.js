let currentModule = 1;

    document.getElementById('nextBtn').addEventListener('click', function() {
        document.getElementById('module' + currentModule).classList.remove('active');
        currentModule++;

        if (currentModule <= 5) {
            document.getElementById('module' + currentModule).classList.add('active');
        }

        if (currentModule === 5) {
            document.getElementById('nextBtn').disabled = true;
        }
    });

    document.getElementById('runBtn').addEventListener('click', function() {
        let code = document.getElementById('codeEditor').value;

        // Simulating C output - in reality, you'd need a C compiler
        let output = "Running code...\n";
        output += "Your code:\n\n" + code;
        document.getElementById('outputArea').textContent = output;
    });