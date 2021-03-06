export const overideMeasure = (option) => {
    CIQ.ChartEngine.prototype.append('setMeasure', function (price1, price2, tick1, tick2, hover) {
        let m = (this.drawingContainer || document).querySelector('.mMeasure');
        let message = '';
        if (!price1 && price1 !== 0) {
            if (!this.anyHighlighted && this.currentVectorParameters.vectorType === '') this.clearMeasure();
        } else {
            if (tick2 !== false) {
                let ticks = Math.abs(tick2 - tick1);
                ticks = Math.round(ticks) + 1;
                const barsStr = this.translateIf('Bars');
                message += ` (${ticks} ${barsStr})`;
            }
            if (m) m.innerHTML = message;
        }

        if (this.activeDrawing) return;      // Don't show measurement Sticky when in the process of drawing
        m = this.controls.mSticky;
        if (m) {
            const mStickyInterior = m.querySelector('.mStickyInterior');
            if (hover) {
                m.style.display = 'inline-block';
                mStickyInterior.style.display = 'inline-block';
                if (price1 || price1 === 0) {
                    mStickyInterior.innerHTML = `${message}`;
                }
                CIQ[`${message === '' ? '' : 'un'}appendClassName`](m, 'hide');
                this.positionSticky(m);
            } else {
                m.style.display = 'none';
                mStickyInterior.innerHTML = '';
            }
        }
    });
    CIQ.Drawing.BaseTwoPoint.prototype.measure = function () {
        if (this.p0 && this.p1) {
            this.stx.setMeasure(this.p0[1], this.p1[1], this.p0[0], this.p1[0], true, this.name);
            const mSticky = this.stx.controls.mSticky;
            const mStickyInterior = mSticky && mSticky.querySelector('.mStickyInterior');
            if (mStickyInterior) {
                const lines = [];
                let title = this.name.capitalize();

                if (option.drawToolsStore) {
                    const drawingItem = option.drawToolsStore.findComputedDrawing(this);
                    if (drawingItem) {
                        title = `${drawingItem.prefix ? `${drawingItem.prefix} - ` : ''} ${drawingItem.text}`;
                    }
                }

                lines.push(title);
                if (this.getYValue) lines.push(this.field || this.stx.defaultPlotField || 'Close');
                lines.push(mStickyInterior.innerHTML);
                mStickyInterior.innerHTML = lines.join(' ');
            }
        }
    };
};
