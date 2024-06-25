export default function createBoxes() {
    const totalRows = 2; // Define the number of rowboxes
    const boxesPerRow = 4; // Define the number of box1 elements per rowbox
    const allTeamContainer = document.querySelector('.all-team');

    for (let j = 0; j < totalRows; j++) {
        const container = document.createElement('div');
        container.classList.add('rowbox');

        for (let i = 0; i < boxesPerRow; i++) {
            const innerContainer = document.createElement('div');
            innerContainer.classList.add('box1');

            const box = document.createElement('div');
            box.classList.add('box');

            const topDiv = document.createElement('div');
            topDiv.classList.add('top1');

            const imageLogo = document.createElement('div');
            imageLogo.classList.add('image-logo');

            const tablePlayer = document.createElement('div');
            tablePlayer.classList.add('table-player');

            const table = document.createElement('table');
            table.classList.add('table-player');
            table.id = `table-player${j * boxesPerRow + i}`;

            const section = document.createElement('section');
            section.classList.add('seed');
            section.id = `team${j * boxesPerRow + i}`;

            tablePlayer.appendChild(table);
            topDiv.appendChild(imageLogo);
            topDiv.appendChild(tablePlayer);
            box.appendChild(topDiv);
            innerContainer.appendChild(box);
            innerContainer.appendChild(section);
            container.appendChild(innerContainer);
        }

        allTeamContainer.appendChild(container);
    }
}
