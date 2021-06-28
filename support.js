(function() {
    let URL = window.ISDEV ? '../../assets/support/' : 'https://atomicwallet.io/assets/support/' //for local development
    function customScript() {
        let imgArr = document.querySelectorAll('article img');
        imgArr.forEach(function(item) {
            let link = document.createElement('a'),
                parent = item.parentNode;

            if (parent.tagName !== 'A') {
                link.href = item.getAttribute('src');
                link.innerHTML = item.outerHTML;
                link.setAttribute('data-featherlight', 'image');
                item.remove();
                parent.appendChild(link);
            }
        })

        //smooth scroll to anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                let id = anchor.getAttribute('href')
                let pos = document.querySelector(id).getClientRects()[0].y - 100 + window.pageYOffset

                window.scrollTo({
                    behavior: 'smooth',
                    top: pos
                });
            });
        });

        if (document.querySelector('#docsSearch')) { document.querySelector('#docsSearch').remove(); }
        var siteRoot = 'https://atomicwallet.io';

        var assetCount = 0
        var loadedAssets = 0

        function assetLoaded() {
            loadedAssets++
            if (loadedAssets === assetCount) {
                $('body').addClass('all-ready')
            }
        }

        function loadScript(url, callback) {
            // Add the script tag to the head
            var head = document.head
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = url

            script.onreadystatechange = callback
            script.onload = callback

            // Fire the loading
            head.appendChild(script)
        }


        // Footer subscribe form
        // assetCount++
        // loadScript(`${siteRoot}/js/scroll.js`, assetLoaded)


        assetCount++
        $(document).ready(function() {
            var categories = {
                'Assets': {
                    icon: '01',
                    gradientStart: '#FB23FF',
                    gradientEnd: '#BB03BF',
                    bg: '#3A384E',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/44-assets',
                },
                'Buy crypto': {
                    icon: '02',
                    gradientStart: '#FFE55A',
                    gradientEnd: '#C47600',
                    bg: '#8D6097',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/61-buy-crypto',
                },
                'Exchange': {
                    icon: '03',
                    gradientStart: '#00E525',
                    gradientEnd: '#007134',
                    bg: '#75B687',
                    desc: "",
                    href: 'https://support.atomicwallet.io/category/99-exchange',
                },
                'FAQ': {
                    icon: '05',
                    gradientStart: '#373737',
                    gradientEnd: '#BDBABA',
                    bg: '#3D88B8',
                    desc: "",
                    href: 'https://support.atomicwallet.io/category/48-faq',
                },
                'Getting Started': {
                    icon: '04',
                    gradientStart: '#41D4FC',
                    gradientEnd: '#27778D',
                    bg: '#5CB8D2',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/13-getting-started',
                },
                'Mobile': {
                    icon: '06',
                    gradientStart: '#FFC061',
                    gradientEnd: '#BE7200',
                    bg: '#F3B554',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/33-mobile',
                },
                'Staking': {
                    icon: '065',
                    gradientStart: '#FFC061',
                    gradientEnd: '#BE7200',
                    bg: '#709F3A',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/129-staking',
                },
                'Troubleshooting': {
                    icon: '07',
                    gradientStart: '#FF5A5A',
                    gradientEnd: '#950101',
                    bg: '#3A384E',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/22-troubleshooting',
                },
                'Security': {
                    icon: '08',
                    gradientStart: '#1F8EFA',
                    gradientEnd: '#064786',
                    bg: '#8D6097',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/17-security',
                },
                'Default': {
                    icon: '01',
                    gradientStart: '#556ff2',
                    gradientEnd: '#00bfff',
                    bg: '#8D6097',
                    desc: '',
                    href: '',
                },
            }
            // remove default nav
            $('#mainNav').remove()

            // main
            mainBlock = ""
            $('body').prepend(mainBlock);


            // add star icons if not search page
            if (!$('#serp').length) {
                $('.icon-article-doc')
                    .after(`<img class="star-icon" src="${URL}img/academy.svg" />`)
                    .remove()
            } else {
                $('.icon-article-doc').remove()
            }


            // remove separator
            $('.sep').remove()

            // category icons
            $('.category').each(function() {
                var element = $(this)
                var name = element.find('h3').text()
                var obj = categories[name] || categories['Default']

                element.prepend(
                    `<img class="category-icon" src="${URL}img/${obj.icon}.svg" />`
                )
                element.append(`<div class="category-desc">${obj.desc}</div>`)
            })

            // re-order categories and popular articles
            var categoryList = $('.category-list')
            $('.most-pop-articles').before(categoryList)

            // Remove sort dropdown
            $('.sort').hide()

            // Add icon to category page header
            var categoryHead = $('#categoryHead h1')
            var categoryName = categoryHead.text()
            var obj = categories[categoryName] || categories['Default'];
            var categoryIcon = $(
                `<img class= "category-icon" src="${URL + "img/" + obj.icon}.svg"/>`
            )
            categoryHead.prepend(categoryIcon)

            // search restuls count above title
            var articlesFound = $('.articlesFound')
            var searchResultsHead = articlesFound.prev()
            searchResultsHead.before(articlesFound)

            $('.articleFoot').remove()

            // Append sign-off
            var articleContent = $('#fullArticle')
            
            let helpBlock = `<div class="need-help">
                                <i class="fa fa-life-ring need-help__img" aria-hidden="true"></i>
                                <p>
                                    Need help? Want to leave us any feedback? Feel free to contact us! We provide friendly human support 24/7. 
                                    <br>
                                    <a class="need-help__button" href="https://atomicwallet.io/support" target="_blank">Reach out to our support team</a>
                                </p>
                            </div>`
            articleContent.append(helpBlock)
            // Links inside an article should all open in a new tab
            articleContent.find('a').each(function(index, element) {
                var link = $(element)
                var href = link.attr('href')
                if (!/^#/.test(href)) {
                    link.attr('target', '_blank')
                }
            })

            articleContent
                .find('img')
                .not('.custom')
                .addClass('noBdr shadow-dark')


            var sidebar = $('#sidebar')
            if (sidebar.length) {
                // Not the homepage

                // Move search from sidebar to header
                var form = sidebar.find('form')
                form.append(`<i class="fa fa-search"></i>`)
                form
                    .find('button span')
                    .removeClass('sr-only')
                    .text('SEARCH')
                form.find('button .icon-search').remove()
                form.find('.search-query').attr('placeholder', '')

                // move last updated to the top
                articleContent.prepend($('.lu'))

                // Remove sidebar header
                sidebar.find('h3').remove()

                if (sidebar.find('.nav').length === 0) {
                    // search results page. Populate the sidebar
                    var nav = $('<ul class="nav nav-list"></ul>')
                    for (var key in categories) {
                        if (key === 'Default') {
                            continue
                        }
                        var current = categories[key]
                        nav.append(`<li><div class="dot"></div><a href="${current.href}">${key}</a></li>`)
                    }
                    sidebar.append(nav)
                }

                // Sidebar dots
                sidebar.find('li').each(function() {
                    var element = $(this)

                    var elementClone = element.clone()
                    elementClone.find('i').remove()
                    var text = elementClone
                        .find('a')
                        .text()
                        .trim()
                    var obj = categories[text] || categories['Default']

                    var dot = $('<div class="dot"></div>')
                    dot.attr(
                        'style',
                        `background-color: ${obj.bg};`
                    )
                    element.prepend(dot)
                })

                // Add conditional classes
                $('body').addClass('not-home')
                $('#contentArea').addClass('not-home-content')
                $('#serp-dd').addClass('not-home')
            } else {
                $('.bg-div').append()
            }

            // navbar toggle
            $('.navbar-toggler').click(function() {
                var button = $(this)
                button.attr('aria-expanded', 'true')
                var navbarCollapse = $('.navbar-collapse')
                navbarCollapse.addClass('show')
            })

            // supported assets search filter
            var analyticsTimeout
            $('.asset-filter input').keyup(function() {
                clearTimeout(analyticsTimeout)

                var input = $(this)
                var str = input.val()

                if (!str.length) {
                    $('.main-tbody tr').removeClass('hidden override__not-shaded override__shaded')
                    $('.no-results').removeClass('enabled')
                    return
                }

                if (str.length > 2) {
                    analyticsTimeout = setTimeout(function() {
                        ga('send', 'event', 'Asset-Search', str.toLowerCase().trim())
                    }, 3000)
                }

                // exchange table
                var rows = $('.assets-table-exchange tr').not('.table-header')
                $('.no-results-exchange').addClass('enabled')
                rows.each(function() {
                    var row = $(this)
                    var rowText = row.find('.coin-name').text() + ' ' + row.find('.coin-tag').text()
                    if (rowText.toLowerCase().search(str.toLowerCase()) > -1) {
                        row.removeClass('hidden')
                        $('.no-results-exchange').removeClass('enabled')
                    } else {
                        row.addClass('hidden')
                    }
                })

                // styling
                $('.assets-table-exchange .main-tbody tr')
                    .not('.hidden')
                    .each(function(index) {
                        var current = $(this)
                        current.removeClass('override__last-row')
                        if (index % 2 === 0) {
                            current.addClass('override__not-shaded').removeClass('override__shaded')
                        } else {
                            current.addClass('override__shaded').removeClass('override__not-shaded')
                        }
                    })
                $('.assets-table-exchange .main-tbody tr')
                    .not('.hidden')
                    .last()
                    .addClass('override__last-row')

                // eth table
                var rows = $('.assets-table-eth tr').not('.table-header')
                $('.no-results-eth').addClass('enabled')
                rows.each(function() {
                    var row = $(this)
                    var rowText = row.find('.coin-name').text() + ' ' + row.find('.coin-tag').text()
                    if (rowText.toLowerCase().search(str.toLowerCase()) > -1) {
                        row.removeClass('hidden')
                        $('.no-results-eth').removeClass('enabled')
                    } else {
                        row.addClass('hidden')
                    }
                })

                // styling
                $('.assets-table-eth .main-tbody tr')
                    .not('.hidden')
                    .each(function(index) {
                        var current = $(this)
                        current.removeClass('override__last-row')
                        if (index % 2 === 0) {
                            current.addClass('override__not-shaded').removeClass('override__shaded')
                        } else {
                            current.addClass('override__shaded').removeClass('override__not-shaded')
                        }
                    })
                $('.assets-table-eth .main-tbody tr')
                    .not('.hidden')
                    .last()
                    .addClass('override__last-row')
            });
            //articles
            var articlesHtml = `
               <section class="articles">
                    <h2 class="articles__title">Popular Articles</h2>
                    <div class="articles__content">
                        <a href="https://support.atomicwallet.io/article/77-does-atomic-wallet-have-fees-to-send-or-receive-the-assets" class="articles__item">Does Atomic Wallet have fees to send or receive?</a>
                        <a href="https://support.atomicwallet.io/article/18-why-is-it-important-to-use-a-vpn" class="articles__item">How to deposit funds to Atomic Wallet?</a>
                        <a href="https://support.atomicwallet.io/article/12-how-to-restore-the-wallet-by-12-word-backup-phrase" class="articles__item">How to restore the wallet by 12-word backup phrase?</a>
                        <a href="https://support.atomicwallet.io/article/47-how-to-buy-cryptocurrencies-with-a-credit-card" class="articles__item">How to buy cryptocurrencies with a credit card?</a>
                        <a href="https://support.atomicwallet.io/article/77-does-atomic-wallet-have-fees-to-send-or-receive-the-assets" class="articles__item">Does Atomic Wallet have fees to send or receive the assets?</a>
                        <a href="https://support.atomicwallet.io/article/6-how-to-install-atomic-wallet-on-your-device" class="articles__item">How to install Atomic Wallet on your device?</a>
                        <a href="https://support.atomicwallet.io/article/104-can-i-cash-out-from-atomic-wallet-to-a-bank-account" class="articles__item">Can I cash out from Atomic Wallet to a bank account?</a>
                        <a href="https://support.atomicwallet.io/article/35-what-is-12-word-recovery-phrase" class="articles__item">What is 12-word recovery phrase?</a>
                        <a href="https://support.atomicwallet.io/article/43-why-20-xrp-is-an-unspendable-balance" class="articles__item">Why 20 XRP is an unspendable balance?</a>
                        <a href="https://support.atomicwallet.io/article/62-what-is-the-fee-to-buy-cryptocurrencies" class="articles__item">What is the fee to buy cryptocurrencies?</a>

                    </div>
                </section>
            `
            // footer
            var footerHtml = /* `<script src=${URL}../support-page.js></script>` + */ `<section class=subscribe-section> <div class=container> <div class=section-heading> <div class=title-2> Even more cool features are coming </div> </div> <form class=subscribe-form data-key=SUBSCRIBE_SECTION_KEY> <input type=hidden name=campaing_id value=103714> <input type=hidden name=action value=subscribe> <input class="subscribe-email subscribe-control" placeholder="Your email" name=email> <button class="subscribe-button subscribe-control btn-blue" type=submit> Subscribe </button> </form> </div> </section> <div class=for-mobile> <a href="https://play.google.com/store/apps/details?id=io.atomicwallet" class="mobile-app isHide" id=mobile-app-link target=_blank data-appstore=https://apps.apple.com/us/app/atomic-wallet/id1478257827> <img data-src=/images/app-logo.png alt=app-logo class="mobile-app__logo lazyload"> <div class=mobile-app__info> <div class=mobile-app__title> Bitcoin Wallet &amp; Ethereum Ripple ZIL DOT </div> <div class="mobile-app__rating rating-stars"> <div class=rating-stars__stars> <div class=rating-stars__rating style=width:90%> <div class=rating-stars__scale></div> </div> </div> </div> </div> <div class="btn-blue btn mobile-app__btn"> Download </div> </a> </div> </main> <section class=popups> <div class=modal-overlay id=popup-subscribe> <div class=modal-window> <div class=modal-window__close>&times;</div> <div class=title-3> Thank you for downloading Atomic! </div> <p class=p-18> Your support helps us build a stronger and convenient platform.<br>A lot of interesting features are coming soon! </p> <div class=title-3> Subscribe for updates </div> <form class=subscribe-form data-key=SUBSCRIBE_POPUP_KEY> <input type=hidden name=campaing_id value=107128> <input type=hidden name=action value=subscribe> <input class="subscribe-email subscribe-control" placeholder="Your email" name=email> <button class="subscribe-button subscribe-control btn-blue" type=submit> Subscribe </button> </form> </div> </div> <div class=modal-overlay id=popup-thanks> <div class=modal-window> <div class=modal-window__close>&times;</div> <div class=title-3> Be a part of Atomic Community! </div> <p class=p-18> Learn more about Atomic and explore blockchain from A to Z </p> <div class=two-buttons-container> <a href=/blog/academy class="btn-large btn-blue" target=_blank> <i class=sprite-book-outline></i> crypto guides </a> <a href=https://support.atomicwallet.io class="btn-large btn-outline" target=_blank> <i class=sprite-search></i> how to use </a> </div> <ul class=social-links> <li> <a href=https://twitter.com/atomicwallet target=_blank> <img data-src=/images/icons/tw.svg alt="Go to atomic wallet twitter" class=lazyload> </a> </li> <li> <a href=https://www.facebook.com/atomicwallet target=_blank> <img data-src=/images/icons/fb.svg alt="Go to atomic wallet facebook" class=lazyload> </a> </li> <li> <a href=https://t.me/AtomicWalletNews target=_blank> <img data-src=/images/icons/tg.svg alt="Go to atomic wallet telegram" class=lazyload> </a> </li> </ul> <p class=p-18> Join our communities to follow latest updates, giveaways and lot more! </p> </div> </div> <div class=modal-overlay id=popup-social> <div class=modal-window> <div class=modal-window__close>&times;</div> <div class=title-3> Feel free to join our social media to stay in touch with Atomic Wallet! </div> <ul class=social-links> <li> <a href=https://twitter.com/atomicwallet target=_blank> <img data-src=/images/icons/tw.svg alt="Go to atomic wallet twitter" class=lazyload> </a> </li> <li> <a href=https://www.facebook.com/atomicwallet target=_blank> <img data-src=/images/icons/fb.svg alt="Go to atomic wallet facebook" class=lazyload> </a> </li> <li> <a href=https://t.me/AtomicWalletNews target=_blank> <img data-src=/images/icons/tg.svg alt="Go to atomic wallet telegram" class=lazyload> </a> </li> </ul> <p class=p-18> These links were created just for you </p> </div> </div> <div class=modal-overlay id=popup-video> <div class=modal-window> <div class=video-card></div> </div> </div> </section> <a class=support-form-link href=/../support> <svg class=support-form-link__icon width=24 height=22 xmlns=http://www.w3.org/2000/svg><path d="M20.347 20.871l-.003-.05c0 .017.001.034.003.05zm-.243-4.278a2 2 0 0 1 .513-1.455c1.11-1.226 1.383-2.212 1.383-4.74C22 5.782 18.046 2 13.125 2h-2.25C5.954 2 2 5.78 2 10.399c0 4.675 4.01 8.626 8.875 8.626h2.25c.834 0 1.606-.207 3.212-.798a2 2 0 0 1 1.575.083l2.355 1.161-.163-2.878zM10.875 0h2.25C19.13 0 24 4.656 24 10.399c0 2.6-.25 4.257-1.9 6.08l.243 4.279c.072.845-.807 1.471-1.633 1.162l-3.682-1.816c-1.212.446-2.527.921-3.903.921h-2.25C4.869 21.025 0 16.142 0 10.4 0 4.656 4.869 0 10.875 0z" fill=#FFF></path></svg> <span>Help</span> </a> <footer class=footer> <div class=container> <div class=row> <div class="col-4 footer__left col-md-12"> <div class=footer__left-support> <div class=logo> <a href=/ > <img src=/images/logo.svg alt=site-logo> </a> </div> <div class=footer__left-copy> <a class="mail-link link" href=/support target=_blank>support@atomicwallet.io</a> <p class=footer-copy>2021 © Atomic Wallet</p> </div> </div> <ul class=social-list> <li> <a href=https://twitter.com/atomicwallet title=twitter class=social-link target=_blank> <img data-src=/images/social/twitter.svg alt="" class=lazyload> </a> </li> <li> <a href=https://t.me/AtomicWalletNews title=telegram class=social-link target=_blank> <img data-src=/images/social/telegram.svg alt="" class=lazyload> </a> </li> <li> <a href=https://www.facebook.com/atomicwallet title=facebook class=social-link target=_blank> <img data-src=/images/social/facebook.svg alt="" class=lazyload> </a> </li> <li> <a href=https://medium.com/atomic-wallet title=medium class=social-link target=_blank> <img data-src=/images/social/medium.svg alt="" class=lazyload> </a> </li> <li> <a href=https://www.youtube.com/c/AtomicWallet title=youtube class=social-link target=_blank> <img data-src=/images/social/youtube.svg alt="" class=lazyload> </a> </li> <li> <a href=https://github.com/Atomicwallet title=github class=social-link target=_blank> <img data-src=/images/social/github.svg alt="" class=lazyload> </a> </li> </ul> <div class=mobile-platforms> <a aria-label="Download wallet for android" href="https://play.google.com/store/apps/details?id=io.atomicwallet" class="mobile-item platform" data-download=android target=_blank> <div class=mobile-item__logo> <img src=/images/download/google-play-icon.svg alt=""> </div> </a> <a aria-label="Download wallet for ios" href=https://apps.apple.com/us/app/atomic-wallet/id1478257827 class="mobile-item platform" data-download=ios target=_blank> <div class=mobile-item__logo> <img src=/images/download/appstore-icon.svg alt=""> </div> </a> <a aria-label="Download wallet for android-apk" href=https://get.atomicwallet.io/download/atomicwallet.apk class="mobile-item platform" data-download=android-apk target=_blank> <div class=mobile-item__logo> <img src=/images/download/DownloadAPK.svg alt=""> </div> </a> </div> </div> <div class="col-8 footer__right col-md-12"> <div class=footer-row> <div class=footer-col> <div class=footer-title> Atomic wallet <div class=footer-title__plus></div> </div> <ul class=footer-list> <li> <a class=link href=https://support.atomicwallet.io/ > Support </a> </li> <li> <a class=link href=/assets-status> Assets Status </a> </li> <li> <a class=link href=https://t.me/AtomicWalletNews> News </a> </li> <li> <a class=link href=/press-kit> Press Kit </a> </li> <li> <a class=link href=/../blog/ > Blog </a> </li> <li> <a class=link href=/../blog/academy> Academy </a> </li> <li> <a class=link href=/voting> Coin Listing </a> </li> <li> <a class=link href=https://atomicwallet.io/blog/news/ambassador-program> Ambassador Program </a> </li> <li> <a class=link href=/contact-us> Contact Us </a> </li> <li> <a class=link href=/testimonials> Testimonials &amp; Reviews </a> </li> <li> <a class=link href=/about-us> About us </a> </li> <li> <a class=link href=/sitemap> Sitemap </a> </li> <li> <a class=link href=/careers> Careers </a> </li> </ul> </div> <div class=footer-col> <div class=footer-title> Legal <div class=footer-title__plus></div> </div> <ul class=footer-list> <li> <a class=link href=/terms-of-service> Terms of service </a> </li> <li> <a class=link href=/privacy-policy> Privacy policy </a> </li> <li> <a class=link href=/cookies-policy> Cookies policy </a> </li> <li> <a class=link href=/aml-kyc-policy> AML/KYC Policy </a> </li> <li> <a class=link href=/risk-disclosure> Risk Disclosure </a> </li> <li> <a class=link href=/licensing> EULA </a> </li> <li> <a class=link href=/anti-fraud-policy> Anti-Fraud Policy </a> </li> <li> <a class=link href=/modern-slavery-statement> Modern Slavery Statement </a> </li> <li> <a class=link href=/legal-dashboard> Legal Dashboard </a> </li> </ul> </div> <div class=footer-col> <div class=footer-title> Prices <div class=footer-title__plus></div> </div> <ul class=footer-list> <li> <a class=link href=/blog/price/bitcoin-price> Bitcoin (BTC) Price </a> </li> <li> <a class=link href=/blog/price/ethereum-price> Ethereum (ETH) Price </a> </li> <li> <a class=link href=/blog/price/ripple-price> Ripple (XRP) Price </a> </li> <li> <a class=link href=/blog/price/litecoin-price> Litecoin (LTC) Price </a> </li> <li> <a class=link href=/blog/price/eos-price> EOS Price </a> </li> <li> <a class=link href=/blog/price/neo-price> NEO Price </a> </li> <li> <a class=link href=/blog/price/tron-price> TRON (TRX) Price </a> </li> <li> <a class=link href=/blog/price/iota-price> IOTA Price </a> </li> <li> <a class=link href=/blog/price/bitcoin-cash-price> Bitcoin Cash (BCH) Price </a> </li> <li> <a class=link href=/blog/price/dogecoin-price> Dogecoin (DOGE) Price </a> </li> <li> <a class=link href=/blog/price/cardano-price> Cardano (ADA) Price </a> </li> <li> <a class=link href=/blog/price/dash-price> DASH Price </a> </li> <li> <a class=link href=/blog/price/stellar-price> Stellar (XLM) Price </a> </li> <li> <a class=link href=/blog/price/zcash-price> Zcash (ZEC) Price </a> </li> <li> <a class=link href=/blog/price/monero-price> Monero (XMR) Price </a> </li> </ul> </div> <div class=footer-col> <div class=footer-title> Assets <div class=footer-title__plus></div> </div> <ul class=footer-list> <li> <a class=link href=/bitcoin-wallet> Bitcoin (BTC) </a> </li> <li> <a class=link href=/ethereum-wallet> Ethereum (ETH) </a> </li> <li> <a class=link href=/ripple-wallet> Ripple (XRP) </a> </li> <li> <a class=link href=/litecoin-wallet> Litecoin (LTC) </a> </li> <li> <a class=link href=/eos-wallet> EOS </a> </li> <li> <a class=link href=/neo-wallet> NEO </a> </li> <li> <a class=link href=/tron-wallet> TRON (TRX) </a> </li> <li> <a class=link href=/dogecoin-wallet> Dogecoin (DOGE) </a> </li> <li> <a class=link href=/cardano-wallet> Cardano (ADA) </a> </li> <li> <a class=link href=/dash-wallet> DASH </a> </li> <li> <a class=link href=/stellar-wallet> Stellar (XLM) </a> </li> <li> <a class=link href=/zcash-wallet> Zcash (ZEC) </a> </li> </ul> </div> <div class=footer-col> <div class=footer-title> Staking <div class=footer-title__plus></div> </div> <ul class=footer-list> <li> <a class=link href=/staking> Staking </a> </li> <li> <a class=link href=/awc-staking> AWC Staking </a> </li> <li> <a class=link href=/cosmos-atom-staking> Cosmos Staking </a> </li> <li> <a class=link href=/tezos-staking> Tezos Staking </a> </li> <li> <a class=link href=/band-staking> Band Protocol Staking </a> </li> <li> <a class=link href=/neo-gas-staking> NEO GAS Staking </a> </li> <li> <a class=link href=/vechain-staking> Vechain Staking </a> </li> <li> <a class=link href=https://atomicwallet.io/blog/academy/pundi-x-staking> Pundi X Staking </a> </li> <li> <a class=link href=/zilliqa-staking> Zilliqa Staking </a> </li> <li> <a class=link href=/cardano-staking> Cardano Staking </a> </li> <li> <a class=link href=/icon-staking> ICON Staking </a> </li> <li> <a class=link href=/polkadot-staking> Polkadot Staking </a> </li> </ul> </div> </div> </div> </div> </div> </footer> `
            if (document.url === "https://support.atomicwallet.io/") {
                footerHtml = articlesHtml + footerHtml;
            }

            //header scripts
            $('footer').remove()
            $('body').append(footerHtml)

            const NEWSLETTER_COOKIES_TIME = 30; // in days
            const SUBSCRIBE_SECTION_KEY = "SUBSCRIBE_SECTION_KEY";
            const SUBSCRIBE_POPUP_KEY = "SUBSCRIBE_POPUP_KEY";
            const SUBSCRIBE_NEWSLETTER_KEY = "SUBSCRIBE_NEWSLETTER_KEY";

            const newsletter = $("#newsletter-popup");
            const newsletterCloseBtn = newsletter.find(".newsletter-popup__close")
            const newsletter_start = $(".newsletter-popup__start");
            const newsletter_finish = $(".newsletter-popup__finish");

            newsletterCloseBtn.on("click", () => {
                closeNewsletterSubscribe()
            })

            function openPopupThanks() {
                document.querySelector('#popup-thanks').classList.add('open');
                console.log("openPopupThanks")
            }

            function closePopupSubscribe() {
                document.querySelector('#popup-subscribe').classList.remove('open');
                console.log("closePopupSubscribe")
            }

            function openPopupSubscribe() {
                document.querySelector('#popup-subscribe').classList.add('open');
                console.log("openPopupSubscribe")
            }

            function closeNewsletterSubscribe() {
                Cookies.set('newsletter', 'isClosed', {
                    expires: NEWSLETTER_COOKIES_TIME
                });
                newsletter.addClass("close")
                console.log("closeNewsletterSubscribe")
            }

            function newsletterNextStep() {
                console.log("newsletterNextStep")
                newsletter_start.fadeOut()
                setTimeout(() => {
                    newsletter_finish.fadeIn()
                }, 100);
            }
            $('.subscribe__form').on('submit', function(e) {
                e.preventDefault();
                const this_key = $(this).data('key');
                $.ajax({
                    url: 'https://atomicwallet.io/subscribe',
                    data: $(this).serialize(),
                    method: 'post',
                    dataType: 'json',
                    timeout: 5000,
                    error: function(err) {
                        console.log('err')
                        alert("Please, enter your email correctly.");
                        console.log('error')
                    },
                    success: function(data) {
                        console.log('succ')
                        if (data.error) {
                            console.log(data)
                            alert("Please, enter your email correctly.");
                        } else {
                            if (this_key === SUBSCRIBE_SECTION_KEY) {
                                openPopupThanks();
                            }
                            if (this_key === SUBSCRIBE_POPUP_KEY) {
                                closePopupSubscribe();
                                openPopupThanks()
                            }
                            if (this_key === SUBSCRIBE_NEWSLETTER_KEY) {
                                newsletterNextStep()
                            }
                        }
                    }
                });
            });

            let popups = document.querySelectorAll(".modal-overlay");
            document.querySelectorAll(".modal-window__close").forEach(btnClose => {
                btnClose.addEventListener("click", () => {
                    btnClose.closest(".modal-overlay").classList.remove("open");
                })
            })
            popups.forEach(popup => {
                popup.addEventListener("click", e => {
                    if (e.target.classList.contains("modal-overlay")) {
                        popup.classList.remove("open");
                    }
                });
            })
            document.querySelectorAll(".laptop-video__btn").forEach(btn => {
                btn.addEventListener("click", function() {
                    const href = this.dataset.video;
                    let iframe = document.createElement("iframe");
                    iframe.setAttribute("allowfullscreen", "");
                    iframe.setAttribute("frameborder", "0");
                    iframe.setAttribute("allow", "autoplay");
                    iframe.setAttribute("src", "https://www.youtube.com/embed/" + href + "?autoplay=1");
                    document.querySelector("#popup-video .modal-window .video-card").appendChild(iframe);
                })
            })

            // header
            let mainSectionTemplate = `<section class="main">
                <div class="main-wrapper">
                <div class="main__left">
                    <div class = "main__left-block">
                        <img src = "https://atomicwallet.io/assets/support/img/lifering.svg" alt = "lifering" class = "main__left-img">
                        <p class="main__title">Atomic Wallet Help Center</p>
                    </div>
                    <form action="/search" method="GET" id="searchBar" autocomplete="off">

                        <input type="text" name="query" title="search-query" class="search-query" placeholder="How can we help you?" aria-labelledby="Search the knowledge base" value="">
                        <div id="serp-dd" style="display:none;">
                            <ul class="result"></ul>
                        </div>

                        <button type="submit" class="fa fa-search"></button>
                    </form>
                </div>
                <div class="main__right">
                    <div class = "main__right-block">
                        <img src="https://atomicwallet.io/assets/support/img/exc-mark.svg" alt="mark" class = "main__right-img">
                        <div class = "main__right-info">
                            <div class = "main__right-date">
                                <!--<p class = "main__right-day">February 12, 2021</p>
                                <p class = "main__right-time">Friday, @ 03:25 UTC</p>-->
                            </div>
                            <p class = "main__right-head">We're facing a high volume of customer requests</p>
                        </div>
                    </div>
                    <div class = "main__right-text">
                        We experience a massive overload with requests at the moment. Our support team works tirelessly to answer all your messages, however, the waiting time can take up to 72h. We will do our best to answer all the requests and we ask for your understanding.
                    </div>
                </div>
            </div>
            </section>`;

            var headerHtml = `<header id=header class=header> <div class=container> <div class=header-row> <div class="header-col header-col-logo"> <div class=logo> <a href=/ > <img src=/images/logo.svg alt=site-logo> </a> </div> </div> <div class=for-mobile> <a aria-label="Go to membership page" href=/membership class=membership-link> <img src=/images/membership-link.svg alt=""> </a> </div> <div class="header-col header-col-menu"> <div class=dropdown> <div class=dropdown__value> Buy crypto </div> <ul class=dropdown__list> <li> <a aria-label="it is a link to /buy-bitcoin" href=/buy-bitcoin class=dropdown-item> <i class="dropdown-item__icon icon icon-btc"></i> <span class=dropdown-item__name>Buy Bitcoin</span> </a> </li> <li> <a aria-label="it is a link to /buy-ethereum" href=/buy-ethereum class=dropdown-item> <i class="dropdown-item__icon icon icon-eth"></i> <span class=dropdown-item__name>Buy Ethereum</span> </a> </li> <li> <a aria-label="it is a link to /buy-ripple" href=/buy-ripple class=dropdown-item> <i class="dropdown-item__icon icon icon-xrp"></i> <span class=dropdown-item__name>Buy Ripple</span> </a> </li> <li> <a aria-label="it is a link to /buy-litecoin" href=/buy-litecoin class=dropdown-item> <i class="dropdown-item__icon icon icon-ltc"></i> <span class=dropdown-item__name>Buy Litecoin</span> </a> </li> <li> <a aria-label="it is a link to /buy-bitcoin-cash" href=/buy-bitcoin-cash class=dropdown-item> <i class="dropdown-item__icon icon icon-bch"></i> <span class=dropdown-item__name>Buy Bitcoin Cash</span> </a> </li> <li> <a aria-label="it is a link to /buy-tron" href=/buy-tron class=dropdown-item> <i class="dropdown-item__icon icon icon-trx"></i> <span class=dropdown-item__name>Buy Tron</span> </a> </li> <li> <a aria-label="it is a link to /buy-stellar" href=/buy-stellar class=dropdown-item> <i class="dropdown-item__icon icon icon-xlm"></i> <span class=dropdown-item__name>Buy Stellar</span> </a> </li> <li> <a aria-label="it is a link to /buy-aave-lend" href=/buy-aave-lend class=dropdown-item> <i class="dropdown-item__icon icon icon-lend"></i> <span class=dropdown-item__name>Buy Aave</span> <div class=dropdown-item__badge>new</div> </a> </li> <li> <a aria-label="it is a link to /buy-dogecoin" href=/buy-dogecoin class=dropdown-item> <i class="dropdown-item__icon icon icon-doge"></i> <span class=dropdown-item__name>Buy Dogecoin</span> <div class=dropdown-item__badge>new</div> </a> </li> <li> <a aria-label="it is a link to /buy-tezos-xtz" href=/buy-tezos-xtz class=dropdown-item> <i class="dropdown-item__icon icon icon-xtz"></i> <span class=dropdown-item__name>Buy tezos</span> <div class=dropdown-item__badge>new</div> </a> </li> </ul> </div> <div class=dropdown> <div class=dropdown__value> Assets </div> <ul class=dropdown__list> <li> <a aria-label="it is a link to /prices" href=/prices class=dropdown-item> <i class="dropdown-item__icon sprite-assets"></i> <span class=dropdown-item__name>All Assets</span> </a> </li> <li> <a aria-label="it is a link to /bitcoin-wallet" href=/bitcoin-wallet class=dropdown-item> <i class="dropdown-item__icon icon icon-btc"></i> <span class=dropdown-item__name>Bitcoin</span> </a> </li> <li> <a aria-label="it is a link to /ethereum-wallet" href=/ethereum-wallet class=dropdown-item> <i class="dropdown-item__icon icon icon-eth"></i> <span class=dropdown-item__name>Ethereum</span> </a> </li> <li> <a aria-label="it is a link to /dogecoin-wallet" href=/dogecoin-wallet class=dropdown-item> <i class="dropdown-item__icon icon icon-doge"></i> <span class=dropdown-item__name>Dogecoin</span> </a> </li> <li> <a aria-label="it is a link to /polkadot-wallet" href=/polkadot-wallet class=dropdown-item> <i class="dropdown-item__icon icon icon-dot"></i> <span class=dropdown-item__name>Polkadot </span> </a> </li> <li> <a aria-label="it is a link to /ripple-wallet" href=/ripple-wallet class=dropdown-item> <i class="dropdown-item__icon icon icon-xrp"></i> <span class=dropdown-item__name>RIPPLE</span> </a> </li> <li> <a aria-label="it is a link to /litecoin-wallet" href=/litecoin-wallet class=dropdown-item> <i class="dropdown-item__icon icon icon-ltc"></i> <span class=dropdown-item__name>Litecoin</span> </a> </li> <li> <a aria-label="it is a link to /tron-wallet" href=/tron-wallet class=dropdown-item> <i class="dropdown-item__icon icon icon-trx"></i> <span class=dropdown-item__name>Tron</span> </a> </li> </ul> </div> <div class=dropdown> <div class=dropdown__value> Earn </div> <ul class=dropdown__list> <li> <a aria-label="it is a link to /token" href=/token class=dropdown-item> <i class="dropdown-item__icon icon icon-awc"></i> <span class=dropdown-item__name>AWC Token</span> </a> </li> <li> <a aria-label="it is a link to /membership" href=/membership class=dropdown-item> <i class="dropdown-item__icon sprite-membership"></i> <span class=dropdown-item__name>MEMBERSHIP</span> </a> </li> <li> <a aria-label="it is a link to /airdrop" href=/airdrop class=dropdown-item> <i class="dropdown-item__icon sprite-airdrop"></i> <span class=dropdown-item__name>Airdrop</span> </a> </li> </ul> </div> <div class=dropdown> <div class=dropdown__value> Staking </div> <ul class=dropdown__list> <li> <a aria-label="it is a link to /staking" href=/staking class=dropdown-item> <i class="dropdown-item__icon sprite-assets"></i> <span class=dropdown-item__name>All Assets</span> </a> </li> <li> <a aria-label="it is a link to /awc-staking" href=/awc-staking class=dropdown-item> <i class="dropdown-item__icon icon icon-awc"></i> <span class=dropdown-item__name>AWC</span> </a> </li> <li> <a aria-label="it is a link to /solana-staking" href=/solana-staking class=dropdown-item> <i class="dropdown-item__icon icon icon-sol"></i> <span class=dropdown-item__name>SOLANA</span> <div class=dropdown-item__badge>new</div> </a> </li> <li> <a aria-label="it is a link to /cardano-staking" href=/cardano-staking class=dropdown-item> <i class="dropdown-item__icon icon icon-ada"></i> <span class=dropdown-item__name>Cardano</span> <div class=dropdown-item__badge>new</div> </a> </li> <li> <a aria-label="it is a link to /zilliqa-staking" href=/zilliqa-staking class=dropdown-item> <i class="dropdown-item__icon icon icon-zil"></i> <span class=dropdown-item__name>Zilliqa</span> <div class=dropdown-item__badge>new</div> </a> </li> <li> <a aria-label="it is a link to /icon-staking" href=/icon-staking class=dropdown-item> <i class="dropdown-item__icon icon icon-icx"></i> <span class=dropdown-item__name>ICON</span> <div class=dropdown-item__badge>new</div> </a> </li> <li> <a aria-label="it is a link to /cosmos-atom-staking" href=/cosmos-atom-staking class=dropdown-item> <i class="dropdown-item__icon icon icon-atom"></i> <span class=dropdown-item__name>Cosmos</span> </a> </li> <li> <a aria-label="it is a link to /tezos-staking" href=/tezos-staking class=dropdown-item> <i class="dropdown-item__icon icon icon-xtz"></i> <span class=dropdown-item__name>Tezos</span> </a> </li> <li> <a aria-label="it is a link to /band-staking" href=/band-staking class=dropdown-item> <i class="dropdown-item__icon icon icon-band"></i> <span class=dropdown-item__name>Band</span> </a> </li> <li> <a aria-label="it is a link to /tron-trx-staking" href=/tron-trx-staking class=dropdown-item> <i class="dropdown-item__icon icon icon-trx"></i> <span class=dropdown-item__name>Tron</span> </a> </li> </ul> </div> <div class=dropdown> <div class=dropdown__value> SUPPORT </div> <ul class=dropdown__list> <li> <a aria-label="it is a link to /support" href=/support class=dropdown-item> <i class="dropdown-item__icon sprite-support"></i> <span class=dropdown-item__name>Contact Support</span> </a> </li> <li> <a aria-label="it is a link to https://support.atomicwallet.io" href=https://support.atomicwallet.io class=dropdown-item> <i class="dropdown-item__icon sprite-knowledge"></i> <span class=dropdown-item__name>Knowledge Base</span> </a> </li> <li> <a aria-label="it is a link to /assets-status" href=/assets-status class=dropdown-item> <i class="dropdown-item__icon sprite-assets-status"></i> <span class=dropdown-item__name>Assets Status</span> </a> </li> <li> <a aria-label="it is a link to /blockchain-explorer" href=/blockchain-explorer class=dropdown-item> <i class="dropdown-item__icon sprite-explorer"></i> <span class=dropdown-item__name>BLOCK EXPLORER</span> </a> </li> <li> <a aria-label="it is a link to /../blog/academy" href=/../blog/academy class=dropdown-item> <i class="dropdown-item__icon sprite-academy"></i> <span class=dropdown-item__name>Academy</span> </a> </li> <li> <a aria-label="it is a link to /../blog/" href=/../blog/ class=dropdown-item> <i class="dropdown-item__icon sprite-blog"></i> <span class=dropdown-item__name>Blog</span> </a> </li> </ul> </div> <div class=for-tablet> <div class=mobile-platforms> <a aria-label="Download wallet for android" href="https://play.google.com/store/apps/details?id=io.atomicwallet" class="mobile-item platform" data-download=android target=_blank> <div class=mobile-item__logo> <img src=/images/download/google-play-icon.svg alt=""> </div> </a> <a aria-label="Download wallet for ios" href=https://apps.apple.com/us/app/atomic-wallet/id1478257827 class="mobile-item platform" data-download=ios target=_blank> <div class=mobile-item__logo> <img src=/images/download/appstore-icon.svg alt=""> </div> </a> <a aria-label="Download wallet for android-apk" href=https://get.atomicwallet.io/download/atomicwallet.apk class="mobile-item platform" data-download=android-apk target=_blank> <div class=mobile-item__logo> <img src=/images/download/DownloadAPK.svg alt=""> </div> </a> </div> <ul class=social-links-2> <li> <a href=https://twitter.com/atomicwallet target=_blank> <img src=/images/icons/twitter.svg alt="Go to atomic wallet twitter"> </a> </li> <li> <a href=https://t.me/AtomicWalletNews target=_blank> <img src=/images/icons/telegram.svg alt="Go to atomic wallet telegram"> </a> </li> <li> <a href=https://www.facebook.com/atomicwallet target=_blank> <img src=/images/icons/facebook.svg alt="Go to atomic wallet facebook"> </a> </li> <li> <a href=https://www.youtube.com/channel/UCLMnUt6BBtA67eic1vRGF3g target=_blank> <img src=/images/icons/youtube.svg alt="Go to atomic wallet youtube"> </a> </li> </ul> </div> </div> <div class="header-col header-col-social"> <ul class=social-links-2> <li> <a href=https://twitter.com/atomicwallet target=_blank> <img src=/images/icons/twitter.svg alt="Go to atomic wallet twitter"> </a> </li> <li> <a href=https://t.me/AtomicWalletNews target=_blank> <img src=/images/icons/telegram.svg alt="Go to atomic wallet telegram"> </a> </li> <li> <a href=https://www.facebook.com/atomicwallet target=_blank> <img src=/images/icons/facebook.svg alt="Go to atomic wallet facebook"> </a> </li> <li> <a href=https://www.youtube.com/channel/UCLMnUt6BBtA67eic1vRGF3g target=_blank> <img src=/images/icons/youtube.svg alt="Go to atomic wallet youtube"> </a> </li> </ul> </div> <div class="header-col header-col-download"> <a href=/downloads class="btn-big btn-blue">Download</a> </div> <button aria-label="burger menu" class=burger id=burger> <span class=burger__item></span> <span class=burger__item></span> <span class=burger__item></span> </button> </div> </div> </header>` + mainSectionTemplate
            $('body').prepend(headerHtml);
            window.initDocsWebSearch();

            //footer
            let trigger = document.querySelectorAll('.footer__title');
            trigger.forEach(function(item) {
                item.addEventListener('click', function() {
                    this.parentNode.classList.toggle('active');
                })
            })
            //end

            insertHeaderScripts();
            assetLoaded();
        })
    }

    if (window.addEventListener) {
        window.addEventListener('load', customScript, false)
    } else if (window.attachEvent) {
        window.attachEvent('onload', customScript)
    }
})();

function insertHeaderScripts() {
    //header and footer scripts
    const accordions = document.querySelectorAll(".accordion");
    if (accordions.length) {
        accordions.forEach(accordion => {
            accordion.addEventListener("click", (event) => {
                const target = event.target,
                    targetContainer = target.closest(".accordionContainer"),
                    targetHeader = target.closest(".accordionHeader"),
                    targetContainers = [...accordion.children];
    
                if (targetContainer && targetHeader) {
                    targetContainer.classList.toggle("active");
    
                    targetContainers.forEach((elem) => {
                        if (elem != targetContainer) {
                            elem.classList.remove("active");
                        }
                    });
                }
            });
        });
    }

    const burger = document.getElementById("burger");
    const header = document.getElementById("header");
    burger.addEventListener("click", () => {
        header.classList.toggle("open");
    });

    const footerColumns = document.querySelectorAll(".footer-col");
    footerColumns.forEach( item => {
        let title = item.querySelector(".footer-title");
        title.addEventListener("click",function(){
            footerColumns.forEach((elem) => {
                if( elem == item ){
                    item.classList.toggle("open");
                }else{
                    elem.classList.remove("open");
                }
            });
        })
    });
    
    const headerDropdowns = document.querySelectorAll(".dropdown");
    headerDropdowns.forEach( item => {
        item.addEventListener("click",function(){
            headerDropdowns.forEach((elem) => {
                if( elem == item ){
                    item.classList.toggle("open");
                }else{
                    elem.classList.remove("open");
                }
            });
        })
    })

    if (document.querySelector('.articleList') || document.querySelector('#fullArticle')) {
        document.body.classList.add('body--article');
    } else {
        document.body.classList.add('body--home');
    }

    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback();

        document.body.append(script);
    }

    function loadSecond() {
        $('body').append(
            '<script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script>\n' +
            '<script type="text/javascript">window.Beacon(\'init\', \'e947e766-402f-44b0-8f02-3ed79a72263c\')</script>')
    }
    $('body').append('<script src="https://atomicwallet.io/assets/support/subscribe_forms/js/common.js"></script>');
}
let recapchaRemoving = setInterval(() => {
    let div = document.querySelector('.g-recaptcha-bubble-arrow')
    if (div) {
        div.parentNode.remove()
        clearInterval(recapchaRemoving)
    }
}, 1000)