<script>
    import ___const from "$prj/lib/i_const";
    import ___prj from "$prj/prjMain";
    import ___log from "$prj/lib/i_log";
    import { _color } from "$prj/lib/i_etc";
    import { g_brandLogo, g_logoSizes } from '$prj/prjStore';
    import { getContext } from 'svelte';
    
    const ___telepasi = getContext('___telepasi');

    let userId = 'codeAdmin';
    let email = 'bluein007@naver.com';

    const apiName = '/v1/user';

    async function handleSubmit(event) {
        event.preventDefault();
        // TODO: 비밀번호 찾기 API 호출
        console.log('비밀번호 초기화 요청:', { userId, email });
        ___telepasi.loading.show('비밀번호 재설정 전송중...');
        const r = await ___prj.api.post(apiName, 'send.pw.reset.mail', null, { 
            userId, 
            email, 
            landingDomain: ___prj.protocol + '//' + ___prj.landingDomain 
        });
        ___log.dev('___submitBtn r:', r);
        ___telepasi.loading.close();

        if (r.data.result === ___const.OK) {
            ___telepasi.alert.showMessage({
                title: '비밀번호 재설정',
                message: `(<span class="px-1 text-gray-700 bg-gray-300">${email}</span>로 비밀번호 설정 이메일이 발송되었습니다.)`,
                color: _color.WARNING,
                time: 0,
                align: ___const.TEXT_CENTER
            });
        }
    }
</script>

<div class="flex items-center justify-center">
    <div class="w-full max-w-md my-10">
        <!-- 로고 -->
        <div class="text-center mb-10">
            <img src={$g_brandLogo} alt="Logo" class={'mx-auto ' + g_logoSizes.login}/>
            <h2 class="mt-6 text-2xl font-bold text-theme">비밀번호 찾기</h2>
        </div>

        <!-- 비밀번호 찾기 폼 -->
        <div class="bg-theme p-8 rounded-lg shadow-theme">
            <form onsubmit={handleSubmit} class="space-y-6">
                <div>
                    <label class="block font-medium text-theme" for="userId">아이디</label>
                    <input
                        id="userId"
                        type="text"
                        bind:value={userId}
                        placeholder="아이디를 입력하세요"
                        class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                            focus:outline-none focus:ring-primary focus:border-primary 
                            bg-input text-input-text text-base placeholder:text-base"
                        required
                    />
                </div>

                <div>
                    <label class="block font-medium text-theme" for="email">이메일</label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        placeholder="가입시 등록한 이메일을 입력하세요"
                        class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                            focus:outline-none focus:ring-primary focus:border-primary 
                            bg-input text-input-text text-base placeholder:text-base"
                        required
                    />
                </div>

                <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                        text-base font-medium text-white bg-primary hover:bg-primary-hover 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    비밀번호 찾기
                </button>
            </form>

            <div class="mt-6 flex justify-center space-x-4 text-sm">
                <a href="/s/signIn" class="text-primary hover:text-primary-hover">로그인</a>
                <span class="text-theme">|</span>
                <a href="/s/idSearch" class="text-primary hover:text-primary-hover">아이디 찾기</a>
            </div>

            <div class="mt-6 text-sm text-theme">
                <p class="text-left">※ 가입된 이메일로 임시 비밀번호가 발송됩니다.</p>
                <p class="text-left">※ 로그인 후 반드시 비밀번호를 변경해 주세요.</p>
            </div>
        </div>
    </div>
</div>

<style>
    :global(.text-theme) {
        color: var(--text-color);
    }

    :global(.bg-theme) {
        background-color: var(--bg-color);
    }

    :global(.border-theme) {
        border-color: var(--border-color);
    }

    :global(.shadow-theme) {
        box-shadow: 0 2px 10px var(--shadow-color);
    }

    :global(.bg-input) {
        background-color: var(--input-bg);
    }

    :global(.text-input-text) {
        color: var(--input-text);
    }

    :global(.text-primary) {
        color: var(--primary-color);
    }

    :global(.bg-primary) {
        background-color: var(--primary-color);
    }

    :global(.hover\:bg-primary-hover:hover) {
        background-color: var(--primary-hover);
    }

    :global(.hover\:text-primary-hover:hover) {
        color: var(--primary-hover);
    }
</style>