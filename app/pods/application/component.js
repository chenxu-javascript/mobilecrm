import Component from '@ember/component';
import $ from 'jquery';
import { on, observes } from 'ember-computed-decorators';
import { bsGetToken, bsRunWhen, bsSetupRem } from 'fe/models/utils';
import { queryParams } from 'boss-qyapp-common/utils/decorators';
export default Component.extend({
  domCache: true,
  tagName: '',
  @queryParams() modalshow: false,

  @on('didInsertElement')
  @observes('modalshow')
  modalshowChanged() {
    let modalshow = this.get('modalshow');
    if (!modalshow && window.f7app) {
      window.f7app.closeModal('.smart-select-popup.modal-in');
      window.f7app.closeModal('.picker-modal.modal-in');
      window.f7app.closeModal('.popup.modal-in');
    }
  },
  didInsertElement() {
    this._super(...arguments);
    bsSetupRem();

    let self = this;

    if (!window.f7app) {
      var myApp = new Framework7({
        ajaxLinks: 'a.ajaxlink',
        modalTitle: '系统提示',
        modalButtonOk: '确定',
        modalButtonCancel: '取消',
        modalPreloaderTitle: '加载中...',
        smartSelectBackText: '返回',
        smartSelectPopupCloseText: '关闭',
        smartSelectPickerCloseText: '完成',
        notificationCloseButtonText: '关闭'
      });
      myApp.destoryViews = function() {
        let app = myApp;
        app.views = [];
        if (app.f7view) {
          app.f7view.destroy();
        }
        app.f7view = null;
      };
      myApp.refreshApp = function() {
        let app = window.f7app;
        app.destoryViews();
        let mainView = app.addView('.view-main', {
          domCache: self.get('domCache'),
          swipeBackPageActiveArea: 120,
          onSwipeBackAfterChange() {
            history.back();
          }
        });
        app.f7view = mainView;
        self.initApp(app);
      };
      let toast = myApp.toast('');
      myApp.f7toast = toast;
      window.f7app = myApp;
    }
    window.f7app.refreshApp();


    bsRunWhen(() => {
      window.f7app.globals = {};
    }, () => !!window.f7app);

    let timer = setInterval(() => {
      bsGetToken();
    }, 60000);

    this.timer = timer;

    $(window).resize();
  },

  initApp(app) {
    let f7app = app;
    f7app.f7view.refreshPages = function() {
      let view = this;

      let container = $(view.container);
      view.pagesContainer = container.find('.pages')[0];
      view.initialPages = [];
      view.initialPagesUrl = [];
      view.initialNavbars = [];
      if (view.params.domCache) {
        var initialPages = container.find('.page');
        for (let i = 0; i < initialPages.length; i++) {
          view.initialPages.push(initialPages[i]);
          view.initialPagesUrl.push('#' + initialPages.eq(i).attr('data-page'));
        }
        if (view.params.dynamicNavbar) {
          var initialNavbars = container.find('.navbar-inner');
          for (let i = 0; i < initialNavbars.length; i++) {
            view.initialNavbars.push(initialNavbars[i]);
          }
        }
      }
      $('.page:not(.cached)').each(function() {
        f7app.initPageWithCallback(this);
      });
    }.bind(f7app.f7view);
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  actions: {
    closePops() {
      if (window.f7app) {
        let f7app = window.f7app;
        f7app.closeModal();
      }
    }
  }
});