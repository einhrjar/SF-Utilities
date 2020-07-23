import { LightningElement, track, api } from 'lwc';
export default class LUI_Loader extends LightningElement {
    @track display = false;
    @track payLoad = 0;

    @track show = false;

    
    @track loadText;

    @api preventScroll = false;
    
    handleMessage(myMessage) {
        console.log(myMessage);
    }

    @api load(loadText) {
        this.display = true;
        this.loadText = loadText;
        this.eval();
    }
    @api close() {
        this.display = false;
        this.loadText = null;
        this.eval();
    }

    @api add() {
        this.payLoad += 1;
        this.eval();
    }
    @api done() {
        if(this.payLoad > 0) this.payLoad -= 1;
        this.eval();
    }

    @api forceClose() {
        this.display = false;
        this.payLoad = 0;
        this.eval();
    }

    eval() {
        this.show = (this.display || this.payLoad);
        if(this.show) {
            // eslint-disable-next-line @lwc/lwc/no-document-query
            if(this.preventScroll) document.getElementsByTagName("body")[0].style.overflow = "hidden";
        } else {
            // eslint-disable-next-line @lwc/lwc/no-document-query
            if(this.preventScroll) document.getElementsByTagName("body")[0].style.overflow = "initial";
        }
    }
}