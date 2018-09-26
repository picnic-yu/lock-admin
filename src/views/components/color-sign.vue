<template>
    <div class="sign-group">
        <span class="normal">正常客户</span>
        <span class="observer">观察户</span>
        <span class="litigation">法诉客户</span>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
.sign-group {
    display: flex;
    justify-content: space-around;
    width:260px;
    height: 33px;
    line-height: 33px;
}

.sign-group .normal::before, .observer::before, .litigation::before{
    content: '';
    border: 6px;
    border-radius: 6px;
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 6px;
    transform: translateY(2px);
}

.sign-group .normal::before {
    background: #19be6b;
}

.sign-group .observer::before {
    background: #ff9900;
}

.sign-group .litigation::before {
    background: #ed3f14;
}
</style>