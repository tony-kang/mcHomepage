<script>
    import ___const from "$prj/lib/i_const";
    import ___prj from "$prj/prjMain";
    import ___log from "$prj/lib/i_log";
    import { _color } from "$prj/lib/i_etc";
    import { g_brandLogo, g_logoSizes } from '$prj/prjStore';
    import { getContext } from 'svelte';

    const ___telepasi = getContext('___telepasi');

    let tel = '';
    let name = '';
    const apiName = '/v1/user';

    async function handleSubmit(event) {
        event.preventDefault();
        // TODO: 아이디 찾기 API 호출
        console.log('아이디 찾기 요청:', { tel, name });
        const r = await ___prj.api.post(apiName, 'id.search', null, { tel, name });
        ___log.dev('___submitBtn r:', r);

        if (r.data.result === ___const.OK) {
            ___telepasi.alert.showMessage({
                title: '아이디 찾기',
                message: `(ID는 <span class="px-1 text-gray-700 bg-gray-300">${r.data.content.searchId}</span> 입니다.)`,
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
            <h2 class="mt-6 text-2xl font-bold text-theme">아이디 찾기</h2>
        </div>

        <!-- 아이디 찾기 폼 -->
        <div class="bg-theme p-8 rounded-lg shadow-theme">
            <form onsubmit={handleSubmit} class="space-y-6">
                <div>
                    <label class="block font-medium text-theme" for="name">이름</label>
                    <input
                        id="name"
                        type="text"
                        bind:value={name}
                        placeholder="이름을 입력하세요"
                        class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                            focus:outline-none focus:ring-primary focus:border-primary 
                            bg-input text-input-text text-base placeholder:text-base"
                        required
                    />
                </div>

                <div>
                    <label class="block font-medium text-theme" for="tel">전화번호</label>
                    <input
                        id="tel"
                        type="tel"
                        bind:value={tel}
                        placeholder="가입시 등록한 전화번호를 입력하세요"
                        class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                            focus:outline-none focus:ring-primary focus:border-primary 
                            bg-input text-input-text text-base placeholder:text-base"
                        required
                    />
                    <span class="text-sm text-gray-500">숫자만 입력해 주세요.(- 없이)</span>
                </div>

                <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                        text-base font-medium text-white bg-primary hover:bg-primary-hover 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    아이디 찾기
                </button>
            </form>

            <div class="mt-6 flex justify-center space-x-4 text-sm">
                <a href="/s/signIn" class="text-primary hover:text-primary-hover">로그인</a>
                <span class="text-theme">|</span>
                <a href="/s/pwSearch" class="text-primary hover:text-primary-hover">비밀번호 찾기</a>
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
        color: var(--primary-text);
    }

    :global(.bg-primary) {
        background-color: var(--primary-bg);
    }

    :global(.hover\:bg-primary-hover:hover) {
        background-color: var(--primary-hover);
    }

    :global(.hover\:text-primary-hover:hover) {
        color: var(--primary-hover);
    }
</style>