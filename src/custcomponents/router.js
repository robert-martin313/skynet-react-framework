

import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
// import enUS from 'antd/lib/locale-provider/en_US'
import Launcher from '../launcher/Launcher'
import GlobalComponents from './'


function RouterConfig({ history }) {

	const {LossAssessmentRecordBizApp} = GlobalComponents
	const {BookSharingPlatformBizApp} = GlobalComponents
	const {AvailableTokenBizApp} = GlobalComponents
	const {AccountDataBizApp} = GlobalComponents
	const {CityBizApp} = GlobalComponents
	const {BookPlazaBizApp} = GlobalComponents
	const {BookRecommendBizApp} = GlobalComponents
	const {BookSharingIncomeMetricBizApp} = GlobalComponents
	const {BookDonationIncomeMetricBizApp} = GlobalComponents
	const {MemberServiceIncomeMetricBizApp} = GlobalComponents
	const {MemberServiceProductBizApp} = GlobalComponents
	const {TokenInMemberServiceProductBizApp} = GlobalComponents
	const {MemberServiceBundleSkuBizApp} = GlobalComponents
	const {LineItemBizApp} = GlobalComponents
	const {MainOrderPaymentBizApp} = GlobalComponents
	const {MainOrderBizApp} = GlobalComponents
	const {OrderLogBizApp} = GlobalComponents
	const {BookBizApp} = GlobalComponents
	const {PrinterBizApp} = GlobalComponents
	const {PrinterTaskBizApp} = GlobalComponents
	const {BookCopyStatusBizApp} = GlobalComponents
	const {BookCopyBizApp} = GlobalComponents
	const {BookCopyTransferBizApp} = GlobalComponents
	const {BookTakeStockPlanBizApp} = GlobalComponents
	const {BookTakeStockResultBizApp} = GlobalComponents
	const {BookCopyOperationRecordBizApp} = GlobalComponents
	const {BorrowingHistoryBizApp} = GlobalComponents
	const {BorrowingExpiredSkuBizApp} = GlobalComponents
	const {BookReviewTypeBizApp} = GlobalComponents
	const {BookReviewBizApp} = GlobalComponents
	const {BookReviewLikeBizApp} = GlobalComponents
	const {BookCopySharingApplicationBizApp} = GlobalComponents
	const {PlatformAccountBizApp} = GlobalComponents
	const {MemberServiceRevenueBizApp} = GlobalComponents
	const {PlatformAccountDetailsBizApp} = GlobalComponents
	const {FundationAccountBizApp} = GlobalComponents
	const {FundationAccountDetailsBizApp} = GlobalComponents
	const {StoreAccountBizApp} = GlobalComponents
	const {StoreAccountDetailsBizApp} = GlobalComponents
	const {TransactionTypeBizApp} = GlobalComponents
	const {CustomerAccountTransactionBizApp} = GlobalComponents
	const {StoreBizApp} = GlobalComponents
	const {StoreSlideBizApp} = GlobalComponents
	const {CampaignPlazaBizApp} = GlobalComponents
	const {CampaignBizApp} = GlobalComponents
	const {CampaignRegisterHistoryBizApp} = GlobalComponents
	const {CampaignReviewBizApp} = GlobalComponents
	const {CampaignLikeBizApp} = GlobalComponents
	const {CustomerBizApp} = GlobalComponents
	const {ShieldCustomerBizApp} = GlobalComponents
	const {InformBizApp} = GlobalComponents
	const {EmployeeBizApp} = GlobalComponents
	const {EmployeeWorkingStoreBizApp} = GlobalComponents
	const {RoleBizApp} = GlobalComponents
	const {UserDomainBizApp} = GlobalComponents
	const {SecUserBizApp} = GlobalComponents
	const {SecUserBlockingBizApp} = GlobalComponents
	const {UserAppBizApp} = GlobalComponents
	const {ObjectAccessBizApp} = GlobalComponents
	const {LoginHistoryBizApp} = GlobalComponents
	const {GenericFormBizApp} = GlobalComponents
	const {FormMessageBizApp} = GlobalComponents
	const {FormFieldMessageBizApp} = GlobalComponents
	const {FormFieldBizApp} = GlobalComponents
	const {FormActionBizApp} = GlobalComponents
	const {ActionTokenBizApp} = GlobalComponents



  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
         <Route path="/home" component={Launcher} />
          <Route path="/lossAssessmentRecord/" component={LossAssessmentRecordBizApp} />
          <Route path="/bookSharingPlatform/" component={BookSharingPlatformBizApp} />
          <Route path="/availableToken/" component={AvailableTokenBizApp} />
          <Route path="/accountData/" component={AccountDataBizApp} />
          <Route path="/city/" component={CityBizApp} />
          <Route path="/bookPlaza/" component={BookPlazaBizApp} />
          <Route path="/bookRecommend/" component={BookRecommendBizApp} />
          <Route path="/bookSharingIncomeMetric/" component={BookSharingIncomeMetricBizApp} />
          <Route path="/bookDonationIncomeMetric/" component={BookDonationIncomeMetricBizApp} />
          <Route path="/memberServiceIncomeMetric/" component={MemberServiceIncomeMetricBizApp} />
          <Route path="/memberServiceProduct/" component={MemberServiceProductBizApp} />
          <Route path="/tokenInMemberServiceProduct/" component={TokenInMemberServiceProductBizApp} />
          <Route path="/memberServiceBundleSku/" component={MemberServiceBundleSkuBizApp} />
          <Route path="/lineItem/" component={LineItemBizApp} />
          <Route path="/mainOrderPayment/" component={MainOrderPaymentBizApp} />
          <Route path="/mainOrder/" component={MainOrderBizApp} />
          <Route path="/orderLog/" component={OrderLogBizApp} />
          <Route path="/book/" component={BookBizApp} />
          <Route path="/printer/" component={PrinterBizApp} />
          <Route path="/printerTask/" component={PrinterTaskBizApp} />
          <Route path="/bookCopyStatus/" component={BookCopyStatusBizApp} />
          <Route path="/bookCopy/" component={BookCopyBizApp} />
          <Route path="/bookCopyTransfer/" component={BookCopyTransferBizApp} />
          <Route path="/bookTakeStockPlan/" component={BookTakeStockPlanBizApp} />
          <Route path="/bookTakeStockResult/" component={BookTakeStockResultBizApp} />
          <Route path="/bookCopyOperationRecord/" component={BookCopyOperationRecordBizApp} />
          <Route path="/borrowingHistory/" component={BorrowingHistoryBizApp} />
          <Route path="/borrowingExpiredSku/" component={BorrowingExpiredSkuBizApp} />
          <Route path="/bookReviewType/" component={BookReviewTypeBizApp} />
          <Route path="/bookReview/" component={BookReviewBizApp} />
          <Route path="/bookReviewLike/" component={BookReviewLikeBizApp} />
          <Route path="/bookCopySharingApplication/" component={BookCopySharingApplicationBizApp} />
          <Route path="/platformAccount/" component={PlatformAccountBizApp} />
          <Route path="/memberServiceRevenue/" component={MemberServiceRevenueBizApp} />
          <Route path="/platformAccountDetails/" component={PlatformAccountDetailsBizApp} />
          <Route path="/fundationAccount/" component={FundationAccountBizApp} />
          <Route path="/fundationAccountDetails/" component={FundationAccountDetailsBizApp} />
          <Route path="/storeAccount/" component={StoreAccountBizApp} />
          <Route path="/storeAccountDetails/" component={StoreAccountDetailsBizApp} />
          <Route path="/transactionType/" component={TransactionTypeBizApp} />
          <Route path="/customerAccountTransaction/" component={CustomerAccountTransactionBizApp} />
          <Route path="/store/" component={StoreBizApp} />
          <Route path="/storeSlide/" component={StoreSlideBizApp} />
          <Route path="/campaignPlaza/" component={CampaignPlazaBizApp} />
          <Route path="/campaign/" component={CampaignBizApp} />
          <Route path="/campaignRegisterHistory/" component={CampaignRegisterHistoryBizApp} />
          <Route path="/campaignReview/" component={CampaignReviewBizApp} />
          <Route path="/campaignLike/" component={CampaignLikeBizApp} />
          <Route path="/customer/" component={CustomerBizApp} />
          <Route path="/shieldCustomer/" component={ShieldCustomerBizApp} />
          <Route path="/inform/" component={InformBizApp} />
          <Route path="/employee/" component={EmployeeBizApp} />
          <Route path="/employeeWorkingStore/" component={EmployeeWorkingStoreBizApp} />
          <Route path="/role/" component={RoleBizApp} />
          <Route path="/userDomain/" component={UserDomainBizApp} />
          <Route path="/secUser/" component={SecUserBizApp} />
          <Route path="/secUserBlocking/" component={SecUserBlockingBizApp} />
          <Route path="/userApp/" component={UserAppBizApp} />
          <Route path="/objectAccess/" component={ObjectAccessBizApp} />
          <Route path="/loginHistory/" component={LoginHistoryBizApp} />
          <Route path="/genericForm/" component={GenericFormBizApp} />
          <Route path="/formMessage/" component={FormMessageBizApp} />
          <Route path="/formFieldMessage/" component={FormFieldMessageBizApp} />
          <Route path="/formField/" component={FormFieldBizApp} />
          <Route path="/formAction/" component={FormActionBizApp} />
          <Route path="/actionToken/" component={ActionTokenBizApp} />
         <Route path="/" component={Launcher} />
        </Switch>
      </Router>
    </LocaleProvider>
  )
}

export default RouterConfig











