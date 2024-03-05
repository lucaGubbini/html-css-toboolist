document.addEventListener('DOMContentLoaded', () => {
    const taskTypes = ['editorial', 'q1-goals', 'recruiting', 'mobile', 'website', 'sales'];
    let sectionCount = document.querySelectorAll('.task-section').length;

    const toggleStatus = (statusElement) => {
        statusElement.classList.toggle('cross');
        statusElement.classList.toggle('checkmark');
        // Update text content based on status
        statusElement.textContent = statusElement.classList.contains('cross') ? '✕' : '✓';
    };

    const addTaskToSection = (sectionId, taskText, taskTypeIndex) => {
        const taskList = document.querySelector(`#${sectionId} .task-list`);
        if (!taskList) {
            alert("Section ID not found!");
            return;
        }

        const li = document.createElement('li');
        li.className = 'task';

        const spanStatus = document.createElement('span');
        spanStatus.className = 'status cross';
        spanStatus.textContent = '✕'; // Cross mark by default
        spanStatus.addEventListener('click', () => toggleStatus(spanStatus));
        li.appendChild(spanStatus);

        const spanContent = document.createElement('span');
        spanContent.className = 'content';
        spanContent.textContent = taskText;
        li.appendChild(spanContent);

        // Add tag based on the task type
        if (taskTypeIndex >= 1 && taskTypeIndex <= taskTypes.length) {
            const spanTag = document.createElement('span');
            spanTag.className = `tag ${taskTypes[taskTypeIndex - 1]}`;
            spanTag.textContent = taskTypes[taskTypeIndex - 1];
            li.appendChild(spanTag);
        }

        taskList.appendChild(li);
    };

    const toggleSection = (sectionHeader) => {
        const arrowSpan = sectionHeader.querySelector('.arrow');
        const taskList = sectionHeader.nextElementSibling;
        if (taskList.style.display === 'none') {
            taskList.style.display = 'block';
            arrowSpan.classList.add('down');
        } else {
            taskList.style.display = 'none';
            arrowSpan.classList.remove('down');
        }
    };


    document.getElementById('addTask').addEventListener('click', () => {
        const sectionNumber = prompt("Enter the section number:");
        const taskText = prompt("Please enter the new task:");
        const taskTypeIndex = parseInt(prompt(`Enter the task type number:\n1) Editorial\n2) Q1 Goals\n3) Recruiting\n4) Mobile\n5) Website\n6) Sales`), 10);
        if (sectionNumber && taskText && taskTypeIndex >= 1 && taskTypeIndex <= taskTypes.length) {
            addTaskToSection(`section-${sectionNumber}`, taskText, taskTypeIndex);
        } else {
            alert("Invalid input!");
        }
    });

    document.getElementById('addSection').addEventListener('click', () => {
        const sectionName = prompt("Enter the new section name:");
        if (sectionName) {
            sectionCount++;
            const sectionId = `section-${sectionCount}`;
            const container = document.querySelector('.container');

            const section = document.createElement('section');
            section.className = 'task-section';
            section.id = sectionId;

            const h2 = document.createElement('h2');
            h2.textContent = sectionName;
            // Make sure to add the down class when a section is created if you want it to be open by default
            const arrowSpan = document.createElement('span');
            arrowSpan.className = 'arrow'; // Do not add 'down' class here if you want it to start as collapsed
            h2.appendChild(arrowSpan);
            h2.addEventListener('click', () => toggleSection(h2));


            const ul = document.createElement('ul');
            ul.className = 'task-list';
            section.appendChild(h2);
            section.appendChild(ul);
            container.appendChild(section);
        }
    });

    // Collapse all sections on initial load
    document.querySelectorAll('.task-section .task-list').forEach((list) => {
        list.style.display = 'none';
    });

    document.querySelectorAll('.task-section .arrow').forEach((arrow) => {
        arrow.classList.remove('down'); // This will ensure that it starts without the 'down' class
    });
});
