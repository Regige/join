function createAddTask() {
    return /*html*/`
            <div id="task-input-left" class="task-input-left">
              <label class="task-label"><span>Title<span class="task-star">*</span></span>
                <input required class="task-input-fd task-input-fd-ti" type="text" 
                name="title" id="task-title" placeholder="Enter a title"/>
              </label>
              <label class="task-label">Description
                <textarea class="task-input-fd task-input-fd-desc" name="description" 
                id="task-description" cols="30" rows="3" placeholder="Enter a Description"
                ></textarea>
              </label>
              <label class="task-label">Assigned to
                <div class="task-assigned-to-con">
                  <input type="button" value="Select contacts to assign" 
                  onclick="stopClosing(event), showAssignedToBt()" 
                  class="task-sub-input-con task-assigned-to"/>
                  <div class="task-assigned-to-sub">
                    <div onclick="stopClosing(event)" id="task-contacts-list-to-assign" 
                    class="d-none task-contacts-list-to-assign"></div>
                    <button onclick="stopClosing(event), showPopupContact()" 
                    id="add-new-contact-bt" 
                    class="d-none task-button task-bt-create task-bt-add pos-rel">Add new contact
                    <img src="./img/contacts_add_icon.svg" alt=""/>
                    </button>
                  </div>
                </div>
              </label>
            </div>
            <div id="task-hr" class="task-hr"></div>
            <div id="task-input-right" class="task-input-right">
              <label class="task-label"><span>Due date<span class="task-star">*</span></span>
                <input required class="task-input-fd" type="date" name="dd/mm/yyyy" id="task-date" 
                placeholder="dd/mm/yyyy"
                />
              </label>
              <label class="task-label">Prio
                <div class="task-prio-bt-con">
                  <input id="prio-bt-Urgent" type="button" value="Urgent" 
                  class="task-input-fd task-prio-bt prio-u" onclick="setTaskPrio('Urgent')"/>
                  <input id="prio-bt-Medium" type="button" value="Medium" 
                  class="task-input-fd task-prio-bt prio-m" onclick="setTaskPrio('Medium')"/>
                  <input id="prio-bt-Low" type="button" value="Low" 
                  class="task-input-fd task-prio-bt prio-l" onclick="setTaskPrio('Low')"/>
                </div>
              </label>
              <label class="task-label"><span>Category<span class="task-star">*</span></span>
                <select class="task-input-fd" name="category" id="category" 
                placeholder="Select task category">
                  <option value="" disabled selected>
                    Select task category
                  </option>
                  <option value="Work">Work</option>
                  <option value="Privat">Privat</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label class="task-label subtask-lable">Subtasks
                <div class="task-sub-input-con" onclick="changeToSubText()">
                  <div id="task-sub-bt-open" class="flx task-sub-bt-open-con">
                    <input type="text" placeholder="Add new subtask" class="task-sub-input"/>
                    <img src="./img/add_black.svg" alt="" />
                  </div>
                  <div id="task-sub-input-text-con" class="d-none flx task-sub-input-text-con">
                    <input id="task-sub-input-text" type="text" placeholder="" class="task-sub-input"
                      minlength="1"/>
                    <div class="flx task-sub-icons">
                      <div onclick="deleteInputText()" class="flx">
                        <img src="/img/Close.svg" alt="" />
                      </div>
                      <div class="task-sub-hr"></div>
                      <div onclick="saveInputText()" class="flx">
                        <img class="task-sub-input-img" src="/img/task_check_bl.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <ul id="task-sub-text" class="task-sub-text"></ul>
                </label>
            </div>`;
}


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