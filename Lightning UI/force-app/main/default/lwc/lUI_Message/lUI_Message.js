import { LightningElement, api, track } from 'lwc';

export default class LUI_Message extends LightningElement {
    @track id;
    @api show(param) {
        this.doDisplayMessage(param);
    }
    @api preventScroll = false;

    @track isDisplayed = false;
    @track isMobile = false;

    @track type; //yesno, simple, custom(not supported yet)
    @track isYesNo = false;
    @track isClose = false;
    @track isSimple = false;
    @track isCustom = false;
    
    //generic
    @track hasClose = false;
    @track hasIcon = false;
    @track mobileFullPage = false;
    @track messageIconName = "utility:info_alt";

    @track messageHeader = "Message Header";
    @track messageBody = "Message Body";

    @track topLevelClassName = 'luiModalBackdrop';
    @track luiModalBody = 'luiModalBody';

    //custom
    @track customButtonJson;

    @api display(id,param) {
        this.topLevelClassName = this.util_getTopLevelClass();
        this.util_reset();
        this.id = id;
        if(param.type) {
            this.type = param.type.toLowerCase();
            switch(this.type) {
                case "yesno" : 
                    this.isYesNo = true;
                    break;
                case "close" : 
                    this.isClose = true;
                    break;
                case "simple" : 
                    this.isSimple = true;
                    break;
                case "custom" : 
                        this.isCustom = true;
                        break;
                default : this.isYesNo = true;
            }

            this.messageHeader = param.messageHeader;
            this.messageBody = param.messageBody;

            this.hasClose = param.hasClose;
            this.hasIcon = param.hasIcon;
            if(param.messageIconName) {
                this.messageIconName = param.messageIconName;
                this.hasIcon = true;
            }


            this.isDisplayed = true;
            // eslint-disable-next-line @lwc/lwc/no-document-query
            if(this.preventScroll) document.getElementsByTagName("body")[0].style.overflow = "hidden";
        }
        else this.util_throwError();
    }
    @api close() {
        this.anim_playClose();
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        window.setTimeout(() => { this.util_reset(true); }, 200);
    }

    util_throwError() {
        console.log("error");
    }

    util_getTopLevelClass() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.isMobile = true;
            return 'luiModalBackdrop mobile';
        } 
        return 'luiModalBackdrop';
        
    }
    util_reset(fullClose) {
        this.id = null;
        this.type = null;
        this.isYesNo = false;
        this.isClose = false;
        this.isSimple = false;
        this.isCustom = false;
        this.messageHeader = null;
        this.messageBody = null;
        this.hasClose = false;
        this.messageIconName = "utility:info_alt";
        this.messageHeader = "Message Header";
        this.messageBody = "Message Body";
        this.hasIcon = false;
        if(fullClose) this.isDisplayed = false;
        // eslint-disable-next-line @lwc/lwc/no-document-query
        if(this.preventScroll) document.getElementsByTagName("body")[0].style.overflow = "initial";
    }
    anim_playClose() {
        this.topLevelClassName = this.util_getTopLevelClass() + ' close';
    }
    onButtonClick(e) {
        this.dispatchEvent(new CustomEvent('buttonpress', {detail : {id: this.id, pressed : e.target.name} }));
    }
    onClosePage() {
        this.close();
    }

}