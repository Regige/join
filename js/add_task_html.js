function createAssignedToBt(i, contact) {
    return /*html*/`
            <div class="task-contacts-list-to-assign-sub">
                <div class="flex-just-btw-ct">
                    <div style="background-color:${contact['hex_color']};" class="task-contacts-color-icon">${contact['logogram']}</div>
                    <label for="contact-${i}">${contact['name']}</label>
                </div>
                <input type="checkbox" name="contact" id="contact-${i}" value="${contact['name']}">
            </div>`;
}


function createInputText(i, subtask) {
    return /*html*/`
        <div id="subtask-field-${i}" class="d-none flex-just-btw-ct">
            <input id="subtask-input-field-${i}" type="text" class="task-sub-input" minlength="1"/>
            <div class="flex-just-btw-ct task-sub-text-sgl-icons">
                <div onclick="deleteSubtask(${i})" class="task-sub-text-sgl-icons-con"><img src="/img/delete.svg" alt=""/></div>
                <div class="task-sub-hr"></div>
                <div onclick="saveEditedSubtask(${i})" class="task-sub-text-sgl-icons-con"><img 
                    src="/img/task_check_bl.svg" alt=""/>
                </div>
            </div>
        </div>
        <div id="subtask-li-${i}" class="flex-just-btw-ct">
            <li class="task-sub-text-sgl">
                ${subtask['text']}
            </li>
            <div class="flex-just-btw-ct task-sub-text-sgl-icons">                        
                <div onclick="editSubtask(${i})" class="task-sub-text-sgl-icons-con"><img src="/img/edit.svg" alt=""/></div>
                <div class="task-sub-hr"></div>
                <div onclick="deleteSubtask(${i})" class="task-sub-text-sgl-icons-con"><img src="/img/delete.svg" alt=""/></div>
            </div>
        </div>`;
}