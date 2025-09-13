<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import ___const from '$prj/lib/i_const';
    import ___prj from '$prj/prjMain';
    import { g_brandLogo, g_logoSizes } from '$prj/prjStore';
    import TermsModal from './TermsModal.svelte';

    // 모달 상태 관리
    let modalState = $state({
        isOpen: false,
        title: '',
        content: ''
    });

    // 약관 내용을 저장할 상태 변수
    let termsContent = $state('');
    let privacyContent = $state('');

    // 약관 보기 함수
    function showTerms(type) {
        modalState.type = type;
        modalState.title = type === 'terms' ? '이용약관' : '개인정보 처리방침';
        modalState.content = type === 'terms' ? termsContent : privacyContent;
        modalState.isOpen = true;
    }

    function closeModal() {
        modalState.isOpen = false;
    }

    // 회원 구분 옵션
    const userTypes = [
        { value: 0, label: '선택해 주세요' },
        { value: 1, label: '일반' },
        { value: 2, label: '상담사' },
        { value: 3, label: '파트너' }
    ];

    let formData = $state({
        user_id: 'user_id',
        user_pw: 'User_pw007!',
        user_pw_confirm: 'User_pw007!',
        user_name: '홍길동',
        user_email: 'hong@gmail.com',
        user_tel: '01012345678',
        user_company: '사용자 회사명',
        user_type: 1
    });

    let agreements = $state({
        terms: false,
        privacy: false,
        marketing: false,
    });

    let errors = $state({
        user_id: '',
        user_pw: '',
        user_pw_confirm: '',
        user_name: '',
        user_email: '',
        user_tel: '',
        user_company: '',
        user_type: 0
    });

    // 유효성 검사 함수들
    function validateUserId() {
        if (formData.user_id.length < 4) {
            errors.user_id = '아이디는 4자 이상이어야 합니다.';
            return false;
        }
        errors.user_id = '';
        return true;
    }

    function validatePassword() {
        // 더 많은 특수문자를 허용하는 정규식
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
        if (!passwordRegex.test(formData.user_pw)) {
            errors.user_pw = '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.';
            return false;
        }
        errors.user_pw = '';
        return true;
    }

    function validatePasswordConfirm() {
        if (formData.user_pw !== formData.user_pw_confirm) {
            errors.user_pw_confirm = '비밀번호가 일치하지 않습니다.';
            return false;
        }
        errors.user_pw_confirm = '';
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.user_email)) {
            errors.user_email = '유효한 이메일 주소를 입력해주세요.';
            return false;
        }
        errors.user_email = '';
        return true;
    }

    function validatePhone() {
        const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
        if (!phoneRegex.test(formData.user_tel)) {
            errors.user_tel = '유효한 휴대폰 번호를 입력해주세요.';
            return false;
        }
        errors.user_tel = '';
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // 모든 필수 필드 유효성 검사
        const isValid = 
            validateUserId() &&
            validatePassword() &&
            validatePasswordConfirm() &&
            validateEmail() &&
            validatePhone();

        // 필수 약관 동의 확인
        if (!agreements.terms || !agreements.privacy) {
            alert('필수 약관에 동의해주세요.');
            return;
        }

        if (!isValid) {
            console.log('validateUserId()', validateUserId());
            console.log('validatePassword()', validatePassword());
            console.log('validatePasswordConfirm()', validatePasswordConfirm());
            console.log('validateEmail()', validateEmail());
            console.log('validatePhone()', validatePhone());
            alert('입력 정보를 확인해주세요.');
            return;
        }

        // TODO: 회원가입 API 호출
        try {
            let apiPath = '/v1/user';
            const _para = null;
            const _data = {
                ...formData,
                user_marketing: agreements.marketing
            };
            ___prj.log.dev('회원가입 API', apiPath, _para, _data);
            const r = await ___prj.api.post(apiPath, 'signup.user', _para, _data);
            ___prj.log.dev('회원가입 API 응답', r);
            if (r.data.result === ___const.OK) {
                alert('회원가입이 완료되었습니다.');
                goto('/s/signIn');
            }
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    }

    // 약관 내용 불러오기
    async function loadTermsContent() {
        try {
            const response = await fetch('/terms/terms.html');
            termsContent = await response.text();
        } catch (error) {
            console.error('이용약관 로드 실패:', error);
        }
    }

    async function loadPrivacyContent() {
        try {
            const response = await fetch('/terms/privacy.html');
            privacyContent = await response.text();
        } catch (error) {
            console.error('개인정보처리방침 로드 실패:', error);
        }
    }

    onMount(() => {
        loadTermsContent();
        loadPrivacyContent();
    });
</script>

<div class="flex items-center justify-center">
    <div class="w-full max-w-2xl my-10 px-4">
        <!-- 로고 -->
        <div class="text-center mb-10">
            <img src={$g_brandLogo} alt="Logo" class={'mx-auto ' + g_logoSizes.login}/>
            <h2 class="mt-6 text-2xl font-bold text-theme">회원가입</h2>
        </div>

        <!-- 회원가입 폼 -->
        <div class="bg-theme p-8 rounded-lg shadow-theme">
            <form onsubmit={handleSubmit} class="space-y-6">
                <!-- 기본 정보 -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-theme border-b border-theme pb-2">기본 정보</h3>
                    
                    <div>
                        <label class="block font-medium text-theme text-xs" for="user_id">
                            아이디 (<span class="edit-item-required">★</span>)
                        </label>
                        <input
                            id="user_id"
                            type="text"
                            bind:value={formData.user_id}
                            onblur={validateUserId}
                            placeholder="아이디 (4자 이상)"
                            class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                                focus:outline-none focus:ring-primary focus:border-primary 
                                bg-input text-input-text text-base placeholder:text-base"
                            autocomplete="username"
                            required
                        />
                        {#if errors.user_id}
                            <p class="mt-1 text-sm text-red-500">{errors.user_id}</p>
                        {/if}
                    </div>

                    <div>
                        <label class="block font-medium text-theme text-xs" for="user_pw">
                            비밀번호 (<span class="edit-item-required">★</span>)
                        </label>
                        <input
                            id="user_pw"
                            type="password"
                            bind:value={formData.user_pw}
                            onblur={validatePassword}
                            placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
                            class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                                focus:outline-none focus:ring-primary focus:border-primary 
                                bg-input text-input-text text-base placeholder:text-base"
                            autocomplete="new-password"
                            required
                        />
                        {#if errors.user_pw}
                            <p class="mt-1 text-sm text-red-500">{errors.user_pw}</p>
                        {/if}
                    </div>

                    <div>
                        <label class="block font-medium text-theme text-xs" for="user_pw_confirm">
                            비밀번호 확인 (<span class="edit-item-required">★</span>)
                        </label>
                        <input
                            id="user_pw_confirm"
                            type="password"
                            bind:value={formData.user_pw_confirm}
                            onblur={validatePasswordConfirm}
                            placeholder="비밀번호 확인"
                            class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                                focus:outline-none focus:ring-primary focus:border-primary 
                                bg-input text-input-text text-base placeholder:text-base"
                            required
                        />
                        {#if errors.user_pw_confirm}
                            <p class="mt-1 text-sm text-red-500">{errors.user_pw_confirm}</p>
                        {/if}
                    </div>
                </div>

                <!-- 개인 정보 -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-theme border-b border-theme pb-2">개인 정보</h3>
                    
                    <div class="flex gap-4">
                        <div class="w-4/12">
                            <label class="block font-medium text-theme text-xs" for="user_type">
                                회원구분 (<span class="edit-item-required">★</span>)
                            </label>
                            <select
                                id="user_type"
                                bind:value={formData.user_type}
                                class="mt-1 block w-full h-[42px] px-3 py-2 border border-theme rounded-md shadow-sm 
                                    focus:outline-none focus:ring-primary focus:border-primary 
                                    bg-input text-input-text text-base"
                                required
                            >
                                {#each userTypes as type}
                                    <option value={type.value}>{type.label}</option>
                                {/each}
                            </select>
                        </div>
                
                        <div class="w-8/12">
                            <label class="block font-medium text-theme text-xs" for="user_name">
                                이름 (<span class="edit-item-required">★</span>)
                            </label>
                            <input
                                id="user_name"
                                type="text"
                                bind:value={formData.user_name}
                                placeholder="이름"
                                class="mt-1 block w-full h-[42px] px-3 py-2 border border-theme rounded-md shadow-sm 
                                    focus:outline-none focus:ring-primary focus:border-primary 
                                    bg-input text-input-text text-base placeholder:text-base"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label class="block font-medium text-theme text-xs" for="user_email">
                            이메일 (<span class="edit-item-required">★</span>)
                        </label>
                        <input
                            id="user_email"
                            type="email"
                            bind:value={formData.user_email}
                            onblur={validateEmail}
                            placeholder="이메일"
                            class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                                focus:outline-none focus:ring-primary focus:border-primary 
                                bg-input text-input-text text-base placeholder:text-base"
                            required
                        />
                        {#if errors.user_email}
                            <p class="mt-1 text-sm text-red-500">{errors.user_email}</p>
                        {/if}
                    </div>

                    <div>
                        <label class="block font-medium text-theme text-xs" for="user_tel">
                            휴대폰 번호 (<span class="edit-item-required">★</span>)
                        </label>
                        <input
                            id="user_tel"
                            type="tel"
                            bind:value={formData.user_tel}
                            onblur={validatePhone}
                            placeholder="휴대폰 번호 (- 없이 입력)"
                            class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                                focus:outline-none focus:ring-primary focus:border-primary 
                                bg-input text-input-text text-base placeholder:text-base"
                            required
                        />
                        {#if errors.user_tel}
                            <p class="mt-1 text-sm text-red-500">{errors.user_tel}</p>
                        {/if}
                    </div>

                    <div>
                        <label class="block font-medium text-theme text-xs" for="user_company">
                            회사명
                        </label>
                        <input
                            id="user_company"
                            type="text"
                            bind:value={formData.user_company}
                            placeholder="회사명 (선택사항)"
                            class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                                focus:outline-none focus:ring-primary focus:border-primary 
                                bg-input text-input-text text-base placeholder:text-base"
                        />
                    </div>
                </div>

                <!-- 약관 동의 -->
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                bind:checked={agreements.terms}
                                class="h-4 w-4 text-primary focus:ring-primary border-theme rounded"
                                required
                            />
                            <label class="ml-2 block text-sm text-theme" for="terms">
                                이용약관 동의 <span class="text-red-500">(필수)</span>
                            </label>
                        </div>
                        <button
                            type="button"
                            onclick={() => showTerms('terms')}
                            class="text-sm text-primary hover:text-primary-hover"
                        >
                            보기
                        </button>
                    </div>
            
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="privacy"
                                type="checkbox"
                                bind:checked={agreements.privacy}
                                class="h-4 w-4 text-primary focus:ring-primary border-theme rounded"
                                required
                            />
                            <label class="ml-2 block text-sm text-theme" for="privacy">
                                개인정보 처리방침 동의 <span class="text-red-500">(필수)</span>
                            </label>
                        </div>
                        <button
                            type="button"
                            onclick={() => showTerms('privacy')}
                            class="text-sm text-primary hover:text-primary-hover"
                        >
                            보기
                        </button>
                    </div>
            
                    <div class="flex items-center">
                        <input
                            id="user_marketing"
                            type="checkbox"
                            bind:checked={agreements.marketing}
                            class="h-4 w-4 text-primary focus:ring-primary border-theme rounded"
                        />
                        <label class="ml-2 block text-sm text-theme" for="user_marketing">
                            마케팅 정보 수신 동의 (선택)
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    onclick={handleSubmit}
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                        text-base font-medium text-white bg-primary hover:bg-primary-hover 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    가입하기
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-sm text-theme">
                    이미 계정이 있으신가요? 
                    <a href="/s/signIn" class="font-medium text-primary hover:text-primary-hover">
                        로그인
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>
<TermsModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        content={modalState.content}
        type={modalState.type}
        onClose={closeModal}
    />

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

    :global(.focus\:ring-primary:focus) {
        --tw-ring-color: var(--primary-color);
    }

    :global(.focus\:border-primary:focus) {
        border-color: var(--primary-color);
    }

    .edit-item-required {
        font-size: 12px;
    }
</style>