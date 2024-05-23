  const diaryEntry = document.getElementById('diary-entry');
        const saveEntryBtn = document.getElementById('save-entry');
        const entriesContainer = document.getElementById('entries-container');
        const passwordInput = document.getElementById('password-input');
        const entryTitleInput = document.getElementById('entry-title');

        let entries = [];

        saveEntryBtn.addEventListener('click', saveEntry);
        entriesContainer.addEventListener('click', showEntry);

        window.addEventListener('beforeunload', saveEntriesToStorage);
        window.addEventListener('load', loadEntriesFromStorage);

        function saveEntry() {
            const enteredPassword = passwordInput.value.trim();
            if (enteredPassword) {
                const entry = diaryEntry.value.trim();
                const entryTitle = entryTitleInput.value.trim() || '';
                if (entry) {
                    entries.push({ content: entry, password: enteredPassword, title: entryTitle });
                    diaryEntry.value = '';
                    passwordInput.value = '';
                    entryTitleInput.value = '';
                    renderEntries();
                    saveEntriesToStorage();
                }
            } else {
                alert('Please enter a password to save the entry.');
            }
        }

        function showEntry(e) {
            if (e.target.classList.contains('entry')) {
                const entryIndex = e.target.dataset.index;
                const enteredPassword = prompt('Enter the password to view the entry:');
                if (enteredPassword === entries[entryIndex].password) {
                    alert(entries[entryIndex].content);
                } else {
                    alert('Incorrect password!');
                }
            }
        }

        function renderEntries() {
            entriesContainer.innerHTML = '';
            entries.forEach((entry, index) => {
                const entryElement = document.createElement('div');
                entryElement.classList.add('entry');
                const entryTitle = entry.title || `Entry ${index + 1}`;
                entryElement.textContent = entryTitle;
                entryElement.dataset.index = index;
                entriesContainer.appendChild(entryElement);
            });
        }

        function saveEntriesToStorage() {
            localStorage.setItem('savedEntries', JSON.stringify(entries));
        }

        function loadEntriesFromStorage() {
            const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];
            entries = savedEntries;
            renderEntries();
        }