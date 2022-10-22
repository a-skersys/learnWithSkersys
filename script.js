const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
let toggle = false;

burger.addEventListener("click", function() {
    if (!toggle) {
        sidebar.style.transform = "translate(0px)";
        burger.innerHTML = '<i class="fas fa-times"></i>';
        toggle = true;
    } else {
        sidebar.style.transform = "translate(-250px)";
        burger.innerHTML = '<i class="fas fa-bars"></i>';
        toggle = false;
    }

}, false);

const bigScreen = window.matchMedia('(min-width: 771px)');

bigScreen.addEventListener("change", () => {
    this.checkNative();
    if (screen.matches) { // If media query matches
        sidebar.style.transform = "translate(0px)";
    } else {
        sidebar.style.transform = "translate(-250px)";
    }
});


function Card(name1, name2, description, comparision, date) {
    this.name1 = name1;
    this.name2 = name2;
    this.description = description;
    this.comparision = comparision;
    this.date = date;
    this.fill = function() {
        container = document.getElementById("container");

        const tile = document.createElement("div");
        tile.setAttribute("class", "tile");
        tile.setAttribute("id", `${this.name1}${this.name2}`);
        container.appendChild(tile);

        const frame = document.createElement("div");
        frame.setAttribute("class", "frame");
        frame.setAttribute("id", `frame${this.name1}${this.name2}`);
        tile.appendChild(frame);

        const currentFrame = document.getElementById(`frame${this.name1}${this.name2}`);

        const header = document.createElement("header");
        header.innerHTML = `<p>// <b>${this.name1}</b> vs. <b>${this.name2}</b></p>`;
        currentFrame.appendChild(header);    

        const main = document.createElement("main");
        main.setAttribute("id", `main${this.name1}${this.name2}`);
        currentFrame.appendChild(main);

        const currentMain = document.getElementById(`main${this.name1}${this.name2}`);
        const name1 = `${this.name1}`;
        const name2 = `${this.name2}`;

        const logoDiv = function(logoNum, node, name) {
            let logo = document.createElement("div");
            logo.setAttribute("class", `logo ${logoNum}`);
            node.appendChild(logo);

            let img = document.createElement("img");
            img.setAttribute("src", `logos/${name}.svg`);
            img.setAttribute("alt", `${name} logo`);
            logo.appendChild(img);


            let p = document.createElement("p");
            p.textContent = name;
            logo.appendChild(p);
        }

        logoDiv("Logo1", currentMain, name1);
        logoDiv("Logo2", currentMain, name2);

        const title = document.createElement("div");
        title.setAttribute("class", "title");
        currentMain.appendChild(title);
        
        const description = document.createElement("p");
        description.textContent = this.description;
        title.appendChild(description);

        const contentDiv = document.createElement("div");
        contentDiv.setAttribute("class", "content");
        currentMain.appendChild(contentDiv);
        
        const ul = document.createElement("ul");
        ul.setAttribute("id", `content${this.name1}${this.name2}`);
        contentDiv.appendChild(ul);

   
        const content = document.getElementById(`content${this.name1}${this.name2}`);

        this.comparision.forEach(element => {
            const list = document.createElement('li');
            const div = document.createElement('div');
            const p = document.createElement('p');
            const value1 = document.createElement('div');
            const value2 = document.createElement('div');

            value1.setAttribute("class", "value");
            value2.setAttribute("class", "value");

            const yes = '<span class="fa-stack"><i class="fas fa-circle fa-stack-1x"></i><i class="fas fa-check-circle fa-stack-1x"></i></span>';
            const no = '<span class="fa-stack"><i class="fas fa-circle fa-stack-1x"></i><i class="fas fa-times-circle fa-stack-1x"></i></span>';
            const maybe = '<span class="fa-stack"><i class="fas fa-circle fa-stack-1x fa-black"></i><i class="fas fa-info-circle fa-stack-1x"></i></span>';

            let values = function(node, element) {
                if (element == "y") {
                    node.innerHTML = yes;
                } else if (element == "n") {
                    node.innerHTML = no;
                } else if (element == "m") {
                    node.innerHTML = maybe;
                }
            }

            values(value1, element[1]);
            values(value2, element[2]);

            p.textContent = element[0];

            content.appendChild(list);
            list.appendChild(div);
            div.appendChild(p);
            list.appendChild(value1);
            list.appendChild(value2);
        });

        const footer = document.createElement("footer");
        footer.innerHTML = '<div class="learnWithSkersys"><img src="learnWithSkersys.svg"><p class="hashtag">#learnWithSkersys</p></div><div class="website"><p><i class="fas fa-desktop"></i> learnwith.skersys.eu</p></div>'
        currentFrame.appendChild(footer); 

        const tags = document.createElement("div");
        tags.setAttribute("class", "tags");
        tile.appendChild(tags); 
        
        const date = document.createElement("div");
        date.setAttribute("class", "date");
        date.textContent = `${this.date}`;
        tags.appendChild(date); 

        const download = document.createElement("div");
        download.setAttribute("class", "download");
        download.innerHTML = `<a href="images\/${this.name1}${this.name2}.png" download><i class="fas fa-file-download"></i> PNG</a>`;
        tags.appendChild(download); 
    }
}


fetch('https://learnwith.skersys.eu/data.json')
    .then((response) => response.json())
    .then((json) => console.log(json));

const menu = document.getElementById("menu");

const data = json.data;


data.forEach(element => {
    const index = data.indexOf(element);
    const myData = data[index];
    const newCard = new Card(myData[0], myData[1], myData[2], myData[3], myData[4]);
    newCard.fill();

    const a = document.createElement('a');
    a.setAttribute("href", `#${data[index][0]}${data[index][1]}`);
    menu.appendChild(a);

    const li = document.createElement('li');
    li.innerHTML = `<p><nobr><img src="logos/${data[index][0]}.svg" width="12px"> ${data[index][0]}</nobr> <span style="color: #999999">vs.</span> <nobr><img src="logos/${data[index][1]}.svg" width="12px">&nbsp;${data[index][1]}</nobr></p>`;
    a.appendChild(li);

});





