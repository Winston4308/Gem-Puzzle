//функция создание игрового поля
function fun_table(size, table) {
    //масив чисел
    let numbersList = [];
    let matrix = []
    for (let i = 0; i < size**2; i++) {
        numbersList.push(i);
    }

    let victory_check = [];
    let num = 1;
    //заполнение таблицы
    for (let i = 0; i < size; i++) {
        matrix.push([]);
        victory_check.push([]);
        

        const tr = document.createElement('tr');
        table.appendChild(tr);
        table.classList.add('gem_puzzle')
        for (let j = 0; j < size; j++) {
            const th = document.createElement('th');
            tr.appendChild(th);
            
            let rand = Math.floor(Math.random() * numbersList.length);
            const cellNum = document.createTextNode(numbersList[rand]);          
            
            if (numbersList[rand]) {
                th.appendChild(cellNum);
            }
            matrix[i].push(numbersList[rand]);
            if (num === size**2) {
                num = 0;
            }
            victory_check[i].push(num);
            num++;

            numbersList.splice(rand, 1);

            th.classList.add('cell')
            th.classList.add(`cell_${i}${j}`)
        } 
    }
    return ([matrix, victory_check]);
}

function close_popup() {
    document.querySelector('.overlay').remove();
    document.querySelector('.popup').remove();
    //document.querySelector('.txt').remove();
    //document.querySelector('.button_close').remove();
}

function popup(time, moves) {
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    const div = document.createElement('div');
    const txt = document.createElement('p');
    const button = document.createElement('button');
    body.appendChild(overlay);
    body.appendChild(div);
    div.appendChild(txt);
    div.appendChild(button);
    overlay.classList.add('overlay');
    div.classList.add('popup');
    txt.classList.add('txt');
    button.classList.add('button');
    button.classList.add('button_close');
    const txt_text = document.createTextNode(`Hooray! You solved the puzzle in ${time} and ${moves} moves!`);
    const button_text = document.createTextNode('Close');
    txt.appendChild(txt_text);
    button.appendChild(button_text);

    // document.onclick = function(action) {
    //     const click = action.target.classList;
    //     if(click[0] == 'button_close') {
    //         close_popup();
    //     }
    // }
}

function start() {
    //загрузка страницы
    const body = document.querySelector('body');

    const wrapper = document.createElement('div');
    const playing_field = document.createElement('div');
    const header = document.createElement('div');
    const counter = document.createElement('div');
    const frame_size = document.createElement('div');
    const footer = document.createElement('div');
    const table = document.createElement('table');

    body.appendChild(wrapper);
    wrapper.appendChild(playing_field);

    playing_field.appendChild(header);
    playing_field.appendChild(counter);  
    playing_field.appendChild(table);
    playing_field.appendChild(frame_size);
    playing_field.appendChild(footer);
    

    wrapper.classList.add('wrapper');
    header.classList.add('header');
    counter.classList.add('counter');
    playing_field.classList.add('playing_field');
    frame_size.classList.add('frame_size');
    footer.classList.add('footer')

    //заполнение хедера
    const buttons = ['Restart', 'Sound', 'Save', 'Result'];
    for (let i = 0; i < 2; i++) {
        const button = document.createElement('button');
        header.appendChild(button);
        const button_text = document.createTextNode(buttons[i]);   
        button.appendChild(button_text);
        button.classList.add('button');
        button.classList.add('header_button');
        button.classList.add(buttons[i]);
    }


    //счетчик
    const txt_1 = document.createElement('p');
    txt_1.classList.add('text');
    txt_1.classList.add('counter_text');
    const counter_text_1 = document.createTextNode('Moves:');
    counter.appendChild(txt_1);
    txt_1.appendChild(counter_text_1);

    const counter_moves = document.createElement('p');
    counter_moves.classList.add('text');
    counter_moves.classList.add('counter_moves');
    const counter_moves_text = document.createTextNode('0');
    counter.appendChild(counter_moves);
    counter_moves.appendChild(counter_moves_text);

    const txt_2 = document.createElement('p');
    txt_2.classList.add('text');
    txt_2.classList.add('counter_text');
    const counter_text_2 = document.createTextNode('Time:');
    counter.appendChild(txt_2);
    txt_2.appendChild(counter_text_2);

    const time = document.createElement('p');
    time.classList.add('text');
    time.classList.add('time');
    const time_text = document.createTextNode('00:00');
    counter.appendChild(time);
    time.appendChild(time_text);


    //размер поля
    const signature = document.createElement('p');
    signature.classList.add('text');
    signature.classList.add('signature');
    const signature_text = document.createTextNode('Frame size:');
    frame_size.appendChild(signature);
    signature.appendChild(signature_text);

    const current_size = document.createElement('p');
    current_size.classList.add('text');
    current_size.classList.add('current_size');
    const current_size_text = document.createTextNode('4x4');
    frame_size.appendChild(current_size);
    current_size.appendChild(current_size_text);



    //заполнение футера
    const p = document.createElement('p');
    p.classList.add('footer_text');
    const footer_text = document.createTextNode('Other sizes:');
    const links = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
    footer.appendChild(p);
    p.appendChild(footer_text);
    for (let i = 0; i < 6; i++) {
        const button = document.createElement('button');
        button.classList.add('button');
        button.classList.add('small_button');
        button.classList.add(`field_${links[i]}`);
        footer.appendChild(button);
        const footer_text = document.createTextNode(links[i]);
        button.appendChild(footer_text);
    }

    //пятнашки
    let size = 4;
    victory_check = fun_table(size, table);
    matrix = victory_check[0];
    victory_check = victory_check[1]
    //console.log(matrix);
    //console.log(victory_check);

    //счетчик
    let counterVal = 0;

    //таймер
    let sec = 0;
    let min = 0;
    let num;
    function tick(){
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
        }
    }
    function add() {
        tick();
        time.innerHTML =(min > 9 ? min : "0" + min)
                + ":" + (sec > 9 ? sec : "0" + sec);
        timer();
    }
    function timer() {
        num = setTimeout(add, 1000);
    }
    
    const audio_button = new Audio("assets/sound_button.mp3");
    const audio = new Audio("assets/sound.mp3");
    let audio_bool = true;

    

    //клик
    document.onclick = function(action) {
        const click = action.target.classList;
        console.log(click);
        if(click[2] == 'Sound') {
            if (audio_bool) {
                audio_bool = false;
            }
            else {
                audio_bool = true;
            }
        }
        
        if(audio_bool && (click[1] == 'header_button' || click[1] == 'small_button' || click[1] == 'button_close')) {
            audio_button.play();
        }
        if(click[0] == 'cell') {
            //console.log(size);
            if (audio_bool) {audio.play()}

            const row = Number(click[1][click[1].length-2])
            const column = Number(click[1][click[1].length-1])
            //console.log(`${row}${column}`);

            if (matrix[row][column] != 0) {
                //document.querySelector().innerHTML = counterVal++;
                const check = [];
                row > 0 ? check.push(true) : check.push(false);
                row < size-1 ? check.push(true) : check.push(false);
                column > 0 ? check.push(true) : check.push(false);
                column < size-1 > 0 ? check.push(true) : check.push(false);
                
                const pressed_cell = document.querySelector(`.cell_${row}${column}`);
                
                if (check[0] && matrix[row-1][column] == 0) {
                    const empty_cell = document.querySelector(`.cell_${row-1}${column}`);
                    empty_cell.innerHTML = matrix[row][column];
                    pressed_cell.innerHTML = '';
                    [matrix[row-1][column], matrix[row][column]] = [matrix[row][column], matrix[row-1][column]];
                    if (counterVal == 0) {timer()}
                    counterVal++;
                    counter_moves.innerHTML = counterVal;
                }
                else if (check[1] && matrix[row+1][column] == 0) {
                    const empty_cell = document.querySelector(`.cell_${row+1}${column}`);
                    empty_cell.innerHTML = matrix[row][column];
                    pressed_cell.innerHTML = '';
                    [matrix[row+1][column], matrix[row][column]] = [matrix[row][column], matrix[row+1][column]];
                    if (counterVal == 0) {timer()}
                    counterVal++;
                    counter_moves.innerHTML = counterVal;
                }
                else if (check[2] && matrix[row][column-1] == 0) {
                    const empty_cell = document.querySelector(`.cell_${row}${column-1}`);
                    empty_cell.innerHTML = matrix[row][column];
                    pressed_cell.innerHTML = '';
                    [matrix[row][column-1], matrix[row][column]] = [matrix[row][column], matrix[row][column-1]];
                    if (counterVal == 0) {timer()}
                    counterVal++;
                    counter_moves.innerHTML = counterVal;
                }
                else if (check[3] && matrix[row][column+1] == 0) {
                    const empty_cell = document.querySelector(`.cell_${row}${column+1}`);
                    empty_cell.innerHTML = matrix[row][column];
                    pressed_cell.innerHTML = '';
                    [matrix[row][column+1], matrix[row][column]] = [matrix[row][column], matrix[row][column+1]];
                    if (counterVal == 0) {timer()}
                    counterVal++;
                    counter_moves.innerHTML = counterVal;
                }
                
                    

                check.splice(0, 4);
                
                //проверка победы

                //matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]]
                //console.log(matrix);
                //console.log(victory_check);
                let bool = true;
                
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (matrix[i][j] != victory_check[i][j]) {
                            bool = false;
                            break;
                        }
                    }
                    if (!bool) {
                        break;
                    }
                }
                if (bool) {
                    console.log('You win!!!');
                    console.log(counterVal);
                    console.log(`${min > 9 ? min : "0" + min}:${sec > 9 ? sec : "0" + sec}`);
                    clearTimeout(num);
                    popup(`${min > 9 ? min : "0" + min}:${sec > 9 ? sec : "0" + sec}`, counterVal);
                }
            }
        }
        else if(click[1] == 'header_button') {
            if(click[2] == 'Restart') {
                counterVal = 0;
                counter_moves.innerHTML = counterVal;

                clearTimeout(num);
                time.innerHTML = "00:00";
                sec = 0;
                min = 0;

                document.querySelector('.gem_puzzle').remove();
                const table = document.createElement('table');
                playing_field.insertBefore(table, frame_size);
                victory_check = fun_table(size, table);
                matrix = victory_check[0];
                victory_check = victory_check[1]
                //console.log(matrix);
                //console.log(victory_check);
            }
            else if (click[2] == 'Save') {
                clearTimeout(num);
                popup(`${min > 9 ? min : "0" + min}:${sec > 9 ? sec : "0" + sec}`, counterVal);
            }
        }
        else if(click[1] == 'small_button') {
            counterVal = 0;
            counter_moves.innerHTML = counterVal;

            clearTimeout(num);
            time.innerHTML = "00:00";
            sec = 0;
            min = 0;

            switch (click[2]) {
                case 'field_3x3':
                    size = 3;
                    current_size.innerHTML = '3x3';
                    break;
                case 'field_4x4':
                    size = 4;
                    current_size.innerHTML = '4x4';
                    break;
                case 'field_5x5':
                    size = 5;
                    current_size.innerHTML = '5x5';
                    break;
                case 'field_6x6':
                    size = 6;
                    current_size.innerHTML = '6x6';
                    break;
                case 'field_7x7':
                    size = 7;
                    current_size.innerHTML = '7x7';
                    break;
                case 'field_8x8':
                    size = 8;
                    current_size.innerHTML = '8x8';
                    break;
                default:
                    break;
            }
            document.querySelector('.gem_puzzle').remove();
            const table = document.createElement('table');
            playing_field.insertBefore(table, frame_size);
            victory_check = fun_table(size, table);
            matrix = victory_check[0];
            victory_check = victory_check[1]
            //console.log(matrix);
            //console.log(victory_check);
        }
        else if(click[1] == 'button_close') {
            close_popup();
            counterVal = 0;
            counter_moves.innerHTML = counterVal;

            clearTimeout(num);
            time.innerHTML = "00:00";
            sec = 0;
            min = 0;

            document.querySelector('.gem_puzzle').remove();
            const table = document.createElement('table');
            playing_field.insertBefore(table, frame_size);
            victory_check = fun_table(size, table);
            matrix = victory_check[0];
            victory_check = victory_check[1]
        }
    };
        
}

start();