import AssetKey from "../../../data/AssetKey";
import GameConfig from "../../../data/GameConfig";
import PurchaseItemForListView from "../purchase/PurchaseItemForListView";
import CalculatePosItem from "./CalculatePosItem";
import PriceCount from "./PriceCount";
import PriceCountForPos from "./PriceCountForPos";

let _itemArr, _startX, _startY, _maximumX, _minimumY, _currentPrice;
export default class CalculatePos {
    constructor(game, parent) {
        this._game = game;
        this._gameGroup = this._game.add.group();
        this._itemGroup = this._game.add.group();
        this._scannerGroup = this._game.add.group();
        this._parent = parent;
        this._key = AssetKey.CALCULATE_POS;
        this._checkOutQuantity = 0;
        _itemArr = [];
        _startY = 0;
        _maximumX = 500;
        _minimumY = 200;
        _currentPrice = 0;
        this._init();
        this._itemGenerate();
        this._posGenerate();
    }

    _init() {

        this.bgRect = this._game.add.graphics(0, 0);
        this.bgRect.beginFill(0x8bd3e7, 1);
        this.bgRect.drawRect(0, 0, 1280, 720);
        this.bgRect.endFill();
        this._gameGroup.addChild(this.bgRect);

        this.countDisplay = new Phaser.Image(this._game, 0, 12, this._key, 'countDisplay');
        this._gameGroup.addChild(this.countDisplay);

        this.scanner = new Phaser.Image(this._game, 225, 187, this._key, 'pos_scanner');
        this.scanner.alpha = 0;
        this.scanner.visible = false;
        this._scannerGroup.addChild(this.scanner);
    }

    _itemGenerate() {
        let pArr = GameConfig.PURCHASE_LIST;

        for (let i = 0; i < pArr.length; i++)
        {
            let asset = 'pos_' + pArr[i].item;
            let quantity = pArr[i].quantity;
            let price = pArr[i].price;
            let term = parseInt(400/pArr.length);
            let maximum = Math.abs(i - 12) * 7;
            // console.log('maximum : ', maximum)
            let xPos = parseInt(this._game.rnd.between(maximum/3, maximum));
            let yPos = (term * i) + 220;
            for (let j = 0; j < quantity; j++)
            {
                xPos += j * this._game.rnd.between(maximum/2, maximum);
                // console.log(xPos);
                yPos += j * this._game.rnd.between(-15, 15);
                let purchaseItem = new CalculatePosItem(this._game, this._itemGroup, this._key, asset, xPos, yPos);
                _itemArr.push(purchaseItem);
                let obj = purchaseItem.item;
                obj.price = price;
                obj.inputEnabled =  true;
                obj.pixelPerfectOver = true;
                obj.pixelPerfectClick = true;
                obj.input.enableDrag(true);
                obj.events.onInputDown.add(this._onDown, this);
                obj.events.onDragUpdate.add(this._onDrag, this);
                obj.events.onDragStop.add(this._stopDrag, this);
            }

        }

        this._itemGroup.sort('y', Phaser.Group.SORT_ASCENDING);

    }

    _onDown(obj) {
        _startX = obj.x;
        _startY = obj.y;
    }

    _onDrag(obj) {

        obj.bringToTop();
        // console.log(parseInt(obj.x), parseInt(obj.y));
        if(obj.x >= 450) this._checkOut(obj);
    }

    _stopDrag(obj) {

        if(obj.checkOut)
        {
            obj.inputEnabled = false;
            let xPos = this._game.rnd.between(900, 1100);
            this._game.add.tween(obj).to({x:xPos}, 500, Phaser.Easing.Quartic.Out, true, 0);
            this._itemGroup.sort('y', Phaser.Group.SORT_ASCENDING);
            return;
        }

        if(obj.y <= _minimumY) obj.y = _startY;
        if(obj.x <= _maximumX) obj.x = _startX;
        else
        {
            // this._checkOut(obj);
            console.log('pass');
        }
        this._itemGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    _checkOut(obj) {

        if(obj.checkOut) return;
        if(this.scanner)
        {
            _currentPrice += Number(obj.price);
            obj.checkOut = true;
            this.scanner.visible = true;
            let tw = this._game.add.tween(this.scanner).to({alpha:1}, 50, Phaser.Easing.Quartic.Out, true, 0, 1, true);
            tw.onComplete.add(()=> {
                this._priceCount._count(_currentPrice);
                this.scanner.alpha = 0;
                this.scanner.visible = false;
                this._checkOutQuantity++;
                if(this._checkOutQuantity >= GameConfig.TOTAL_QUANTITY)
                {
                    this._destroy();
                    this._parent._createPaymentPos();
                    console.log('NEXT PHASE');
                }
            })
        }

    }

    _posGenerate() {
        this._priceCount = new PriceCountForPos(this._game, this._gameGroup, this._key);
    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._itemGroup.removeChildren(0, this._itemGroup.length);
        this._scannerGroup.removeChildren(0, this._scannerGroup.length);
        for(let i  =0; i<this._gameGroup.length; i++) this._gameGroup[i].destroy();
        for(let i  =0; i<this._itemGroup.length; i++) this._itemGroup[i].destroy();
        for(let i  =0; i<this._scannerGroup.length; i++) this._scannerGroup[i].destroy();
    }


}